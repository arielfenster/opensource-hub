import * as v from 'valibot';
import { passwordSchema } from '../auth/password.schema';

export const updateSecurityInfoSchema = v.pipe(
	v.object({
		password: passwordSchema,
		newPassword: passwordSchema,
		confirmNewPassword: passwordSchema,
	}),
	v.check(
		(values) => values.password !== values.newPassword,
		'New password must be different from current password',
	),
	v.check(
		(values) => values.newPassword === values.confirmNewPassword,
		'New password and confirmation new password must match',
	),
);

export type UpdateSecurityInfoInput = v.InferInput<typeof updateSecurityInfoSchema>;
