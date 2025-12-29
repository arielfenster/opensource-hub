import type { CreateProjectInput } from '$/shared/schemas/project/create-project.schema';
import type { Project, ProjectDetails } from '$/shared/types/projects';
import { nanoid } from 'nanoid';
import type { FindProjectsDTO } from './dto/find-projects.dto';
import { projectsDataAccessor } from './projects.data-accessor';
import type { FindProjectParams, FindProjectUniqueIdentifier } from './types';
import { executeDataOperation } from '../dal/data-executor';

type FindProjectReturnValue = NonNullable<
	Awaited<ReturnType<typeof projectsDataAccessor.findProjectByUniqueIdentifier>>
>;

class ProjectsService {
	async getProjects(dto: FindProjectsDTO) {
		const projects = await projectsDataAccessor.findProjects(dto);

		return projects.flatMap(this.processProject);
	}

	async findProject(params: FindProjectParams) {
		const keys = Object.keys(params);
		if (keys.length === 0) {
			return null;
		}

		const searchKey = keys[0] as FindProjectUniqueIdentifier;
		const project = await projectsDataAccessor.findProjectByUniqueIdentifier(
			searchKey,
			params[searchKey] as string,
		);

		return project ? this.processProject(project) : null;
	}

	generateProjectSlug(name: string) {
		const slug = name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');

		return `${slug}-${nanoid(10)}`;
	}

	private processProject(project: FindProjectReturnValue): ProjectDetails {
		return {
			...project,
			technologies: project.technologies.map((tech) => tech.technology),
		};
	}

	async createProject(data: CreateProjectInput, ownerId: string) {
		const slug = this.generateProjectSlug(data.name);
		const keyFeatures = (data.keyFeatures ?? []).map((value) => value.feature).filter(Boolean);
		const teamPositions = data.teamPositions ?? [];

		return executeDataOperation<Project>(async ({ projects, technologies }) => {
			const project = await projects.insertProject({
				...data,
				slug,
				teamPositions,
				keyFeatures,
				ownerId,
			});

			if (data.technologies?.length) {
				const technologyIds = data.technologies.map((tech) => tech.id);
				await technologies.linkTechnologiesToProject(project.id, technologyIds);
			}

			return project;
		});
	}
}

export const projectsService = new ProjectsService();
