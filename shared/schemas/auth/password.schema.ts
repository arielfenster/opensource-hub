import * as v from 'valibot';

export const MIN_PASSWORD_LENGTH = 8;

export const passwordSchema = v.pipe(
	v.string(),
	v.minLength(
		MIN_PASSWORD_LENGTH,
		`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
	),
);
