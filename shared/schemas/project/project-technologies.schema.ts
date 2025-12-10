import z from 'zod';

export const projectTechnologiesSchema = z.object({
	technologies: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			group: z.object({
				id: z.string(),
				name: z.string(),
			}),
		}),
	),
});

export type ProjectTechnologiesInput = z.infer<typeof projectTechnologiesSchema>;
