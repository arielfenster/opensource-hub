import { PasswordField } from '$/client/components/form/password-field';
import { Button } from '$/client/components/ui/button';
import {
	updateSecurityInfoSchema,
	type UpdateSecurityInfoInput,
} from '$/shared/schemas/user/update-security-info.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type Props = {
	onSubmit: (input: UpdateSecurityInfoInput) => void;
	loading?: boolean;
};

export function SecurityInfoForm({ onSubmit, loading }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateSecurityInfoInput>({
		resolver: zodResolver(updateSecurityInfoSchema),
	});

	return (
		<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
			<PasswordField
				error={errors.password?.message}
				label='Current password'
				{...register('password')}
			/>
			<PasswordField
				error={errors.newPassword?.message}
				label='New password'
				{...register('newPassword')}
			/>
			<PasswordField
				error={errors.confirmNewPassword?.message}
				label='Confirm new password'
				{...register('confirmNewPassword')}
			/>

			<Button type='submit' className='self-end rounded-sm' loading={loading}>
				Save Changes
			</Button>
		</form>
	);
}
