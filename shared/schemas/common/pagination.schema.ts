import * as v from 'valibot';

const unionSchema = v.pipe(
	v.union([v.string(), v.number()]),
	v.transform((value) => Number(value)),
);

export const paginationSchema = v.object({
	limit: v.optional(v.pipe(unionSchema, v.minValue(1), v.maxValue(100)), 10),
	skip: v.optional(v.pipe(unionSchema, v.minValue(0)), 0),
});

export type PaginationInput = v.InferInput<typeof paginationSchema>;
export type PaginationOutput = v.InferOutput<typeof paginationSchema>;
