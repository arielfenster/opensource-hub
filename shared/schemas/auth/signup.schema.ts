import { z } from 'zod';
import { userSchema } from '../user/user.schema';
import { imageSchema } from '../common/image.schema';

export const signupSchema = userSchema
	.pick({
		firstName: true,
		lastName: true,
		email: true,
		password: true,
		bio: true,
	})
	.extend({
		image: imageSchema.optional(),
	});

export type SignupInput = z.infer<typeof signupSchema>;
