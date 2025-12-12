import * as v from 'valibot';
import { signupSchema } from '../auth/signup.schema';
import { socialLinkSchema } from './social-links.schema';

export const updatePersonalInfoSchema = v.object({
	...v.pick(signupSchema, ['firstName', 'lastName', 'email', 'bio', 'image']).entries,
	socialLinks: v.optional(v.array(socialLinkSchema)),
});

export type UpdatePersonalInfoInput = v.InferInput<typeof updatePersonalInfoSchema>;
