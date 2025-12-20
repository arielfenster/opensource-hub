import * as v from 'valibot';
import { projectGeneralInfoSchema } from './project-general-info.schema';
import { projectLinksSchema } from './project-links.schema';
import { projectTechnologiesSchema } from './project-technologies.schema';

export const createProjectSchema = v.object({
	...projectGeneralInfoSchema.entries,
	links: v.optional(projectLinksSchema),
	...projectTechnologiesSchema.entries,
});

export type CreateProjectInput = v.InferInput<typeof createProjectSchema>;
