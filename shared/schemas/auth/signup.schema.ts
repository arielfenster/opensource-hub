import { z } from 'zod';
import { passwordSchema } from './password.schema';

export const signupSchema = z.object({
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	email: z.string().email(),
	password: passwordSchema,
	bio: z.string().max(250).optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
