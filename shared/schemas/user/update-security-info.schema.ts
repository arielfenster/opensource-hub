import z from 'zod';
import { passwordSchema } from '../auth/password.schema';

export const updateSecurityInfoSchema = z
	.object({
		password: passwordSchema,
		newPassword: passwordSchema,
		confirmNewPassword: passwordSchema,
	})
	.check((ctx) => {
		const { password, newPassword, confirmNewPassword } = ctx.value;

		if (password === newPassword) {
			ctx.issues.push({
				code: 'invalid_value',
				message: 'New password must be different from current password.',
				path: ['newPassword'],
				values: [ctx.value.password, ctx.value.newPassword],
				input: ctx.value,
			});
		}

		if (newPassword !== confirmNewPassword) {
			ctx.issues.push({
				code: 'invalid_value',
				message: 'New password and confirm new password must match.',
				path: ['confirmNewPassword'],
				values: [ctx.value.newPassword, ctx.value.confirmNewPassword],
				input: ctx.value,
			});
		}
	});

export type UpdateSecurityInfoInput = z.infer<typeof updateSecurityInfoSchema>;
