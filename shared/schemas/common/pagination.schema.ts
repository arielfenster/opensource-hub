import z from 'zod';

export const paginationSchema = z.object({
	limit: z.coerce.number().min(1).max(100).optional().default(10),
	skip: z.coerce.number().min(0).optional().default(0),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
