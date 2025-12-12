import * as v from 'valibot';
import { passwordSchema } from '../auth/password.schema';

export const MAX_BIO_LENGTH = 200;

export const userSchema = v.object({
	firstName: v.pipe(v.string(), v.minLength(2)),
	lastName: v.pipe(v.string(), v.minLength(2)),
	email: v.pipe(v.string(), v.email()),
	password: passwordSchema,
	bio: v.nullish(
		v.pipe(
			v.string(),
			v.maxLength(
				MAX_BIO_LENGTH,
				`Bio cannot contain more than ${MAX_BIO_LENGTH} characters`,
			),
		),
	),
});
