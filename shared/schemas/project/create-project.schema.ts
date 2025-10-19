import z from 'zod';
import { projectGeneralInfoSchema } from './project-general-info.schema';
import { projectLinksSchema } from './project-links.schema';
import { projectTechnologiesSchema } from './project-technologies.schema';

export const createProjectSchema = projectGeneralInfoSchema
	.extend({
		links: projectLinksSchema.optional(),
	})
	.extend(projectTechnologiesSchema.shape);

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
