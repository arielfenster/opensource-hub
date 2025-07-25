import { users } from '$/server/database/schemas';
import { createSelectSchema } from 'drizzle-zod';
import { passwordSchema } from '../auth/password.schema';
import z from 'zod';

export const MAX_BIO_LENGTH = 200;

export const userSchema = createSelectSchema(users, {
	firstName: (schema) => schema.min(2),
	lastName: (schema) => schema.min(2),
	email: () => z.email().toLowerCase(),
	password: () => passwordSchema,
	bio: (schema) =>
		schema
			.max(MAX_BIO_LENGTH, {
				error: `Bio cannot contain more than ${MAX_BIO_LENGTH} characters`,
			})
			.optional(),
});
