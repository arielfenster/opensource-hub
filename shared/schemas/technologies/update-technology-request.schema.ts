import { technologyRequestStatusValues } from '$/shared/types/technology-requests';
import * as v from 'valibot';

export const updateTechnologyRequestSchema = v.object({
	status: v.picklist(technologyRequestStatusValues),
});

export type UpdateTechnologyRequestInput = v.InferInput<typeof updateTechnologyRequestSchema>;
