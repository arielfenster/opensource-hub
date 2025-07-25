import { Textarea } from '$/client/components/form/textarea';
import { TextField } from '$/client/components/form/textfield';
import { Button } from '$/client/components/ui/button';
import {
	updatePersonalInfoSchema,
	type UpdatePersonalInfoInput,
} from '$/shared/schemas/user/update-personal-info.schema';
import type { AuthenticatedUser } from '$/shared/types/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type Props = {
	user: AuthenticatedUser;
	onSubmit: (input: UpdatePersonalInfoInput) => void;
	loading?: boolean;
};

export function PersonalSettingsForm({ user, onSubmit, loading }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdatePersonalInfoInput>({
		defaultValues: user,
		resolver: zodResolver(updatePersonalInfoSchema),
	});

	return (
		<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
			<div>profile picture</div>
			<div className='flex gap-8'>
				<TextField
					label='First Name'
					error={errors.firstName?.message}
					stretch
					{...register('firstName')}
				/>
				<TextField
					label='Last Name'
					error={errors.lastName?.message}
					stretch
					{...register('lastName')}
				/>
			</div>

			<TextField label='Email' error={errors.email?.message} stretch {...register('email')} />
			{/* TODO: add validation to this. make the limit a constant */}
			<Textarea label='Bio' limit={200} error={errors.bio?.message} {...register('bio')} />

			<div className='flex flex-col gap-2'>
				<span className='text-xl font-medium'>Social Links</span>
				<div className='grid grid-cols-2 gap-x-12 gap-y-4'>
					<TextField
						placeholder='https://www.example.com'
						stretch
						label='Github'
						error={errors.socialLinks?.[0]?.url?.message}
						{...register('socialLinks.0.url')}
					/>
					<TextField
						placeholder='https://www.example.com'
						stretch
						label='Linkedin'
						error={errors.socialLinks?.[1]?.url?.message}
						{...register('socialLinks.1.url')}
					/>
					<TextField
						placeholder='https://www.example.com'
						stretch
						label='Personal Website'
						error={errors.socialLinks?.[2]?.url?.message}
						{...register('socialLinks.2.url')}
					/>
					<TextField
						placeholder='https://www.example.com'
						stretch
						label='Other'
						error={errors.socialLinks?.[3]?.url?.message}
						{...register('socialLinks.3.url')}
					/>
				</div>
			</div>

			<Button type='submit' className='self-end rounded-sm' loading={loading}>
				Save Changes
			</Button>
		</form>
	);
}
