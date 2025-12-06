import { z } from 'zod';
import { signupSchema } from '../auth/signup.schema';
import { socialLinkSchema } from './social-links.schema';

export const updatePersonalInfoSchema = signupSchema
	.pick({
		firstName: true,
		lastName: true,
		email: true,
		bio: true,
		image: true,
	})
	.extend({
		socialLinks: z.array(socialLinkSchema).optional(),
	});

export type UpdatePersonalInfoInput = z.infer<typeof updatePersonalInfoSchema>;
