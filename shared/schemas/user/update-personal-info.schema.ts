import { z } from 'zod';
import { signupSchema } from '../auth/signup.schema';

export const updatePersonalInfoSchema = signupSchema.pick({
	firstName: true,
	lastName: true,
	email: true,
	bio: true,
	image: true,
});

export type UpdatePersonalInfoInput = z.infer<typeof updatePersonalInfoSchema>;
