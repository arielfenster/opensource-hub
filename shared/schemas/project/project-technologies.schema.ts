import { technologies, technologyGroups } from '$/server/database/schemas';
import { createSelectSchema } from 'drizzle-zod';
import z from 'zod';

export const projectTechnologiesSchema = z.object({
	technologies: z.array(
		createSelectSchema(technologies, {
			id: () => z.nanoid(),
			groupId: () => z.nanoid(),
		}).extend({
			group: createSelectSchema(technologyGroups, {
				id: () => z.nanoid(),
			}),
		}),
	),
});

export type ProjectTechnologiesInput = z.infer<typeof projectTechnologiesSchema>;
