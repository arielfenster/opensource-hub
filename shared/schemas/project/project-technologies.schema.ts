import * as v from 'valibot';

// TODO: move this to technologies schemas folder
export const projectTechnologiesSchema = v.object({
	technologies: v.array(
		v.object({
			id: v.string(),
			name: v.string(),
			group: v.object({
				id: v.string(),
				name: v.string(),
			}),
		}),
	),
});

export type ProjectTechnologiesInput = v.InferInput<typeof projectTechnologiesSchema>;
