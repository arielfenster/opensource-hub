import * as v from 'valibot';
import { userSchema } from '../user/user.schema';
import { imageSchema } from '../common/image.schema';

export const signupSchema = v.object({
	...userSchema.entries,
	image: v.optional(imageSchema),
});

export type SignupInput = v.InferInput<typeof signupSchema>;
