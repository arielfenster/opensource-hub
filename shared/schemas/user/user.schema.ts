import { users } from '$/server/database/schemas';
import { createSelectSchema } from 'drizzle-zod';
import { passwordSchema } from '../auth/password.schema';

export const userSchema = createSelectSchema(users, {
	firstName: (schema) => schema.min(2),
	lastName: (schema) => schema.min(2),
	email: (schema) => schema.email().toLowerCase(),
	password: () => passwordSchema,
	bio: (schema) => schema.max(250).optional(),
});
