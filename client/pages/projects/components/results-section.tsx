import type { ProjectDetails } from '$/shared/types/projects';
import { ProjectCard } from './project-card';

type ResultsSectionProps = {
	projects: ProjectDetails[];
};

export function ResultsSection({ projects }: ResultsSectionProps) {
	return (
		<section className='grid grid-cols-3 gap-8'>
			{projects.length ? (
				projects.map((project) => <ProjectCard key={project.id} project={project} />)
			) : (
				<span className='text-xl font-semibold'>No projects matched your filters</span>
			)}
		</section>
	);
}
