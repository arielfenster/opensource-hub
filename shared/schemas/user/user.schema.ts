import { passwordSchema } from '../auth/password.schema';
import z from 'zod';

export const MAX_BIO_LENGTH = 200;

export const userSchema = z.object({
	firstName: z.string().min(2),
	lastName: z.string().min(2),
	email: z.email().toLowerCase(),
	password: passwordSchema,
	bio: z
		.string()
		.max(MAX_BIO_LENGTH, {
			error: `Bio cannot contain more than ${MAX_BIO_LENGTH} characters`,
		})
		.nullish(),
});
