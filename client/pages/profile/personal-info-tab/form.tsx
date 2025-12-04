import { Textarea } from '$/client/components/form/textarea';
import { TextField } from '$/client/components/form/textfield';
import { Button } from '$/client/components/ui/button';
import {
	updatePersonalInfoSchema,
	type UpdatePersonalInfoInput,
} from '$/shared/schemas/user/update-personal-info.schema';
import { MAX_BIO_LENGTH } from '$/shared/schemas/user/user.schema';
import type { UserDetails } from '$/shared/types/users';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type Props = {
	user: UserDetails;
	onSubmit: (input: UpdatePersonalInfoInput) => void;
	loading?: boolean;
};

// TODO:
// 1. change the button to disabled when there are no changes
// 2. add profile picture upload functionality
// 3. send to the server only the fields that were updated/touched
export function PersonalInfoForm({ user, onSubmit, loading }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
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
					{...register('firstName')}
				/>
				<TextField
					label='Last Name'
					error={errors.lastName?.message}
					{...register('lastName')}
				/>
			</div>

			<TextField label='Email' error={errors.email?.message} {...register('email')} />
			<Textarea
				label='Bio'
				limit={MAX_BIO_LENGTH}
				error={errors.bio?.message}
				value={watch('bio') || ''}
				{...register('bio')}
			/>

			<div className='flex flex-col gap-2'>
				<span className='text-xl font-medium'>Social Links</span>
				<div className='grid grid-cols-2 gap-x-12 gap-y-4'>
					<TextField
						placeholder='https://www.example.com'
						label='Github'
						error={errors.socialLinks?.[0]?.url?.message}
						{...register('socialLinks.0.url')}
					/>
					<TextField
						placeholder='https://www.example.com'
						label='Linkedin'
						error={errors.socialLinks?.[1]?.url?.message}
						{...register('socialLinks.1.url')}
					/>
					<TextField
						placeholder='https://www.example.com'
						label='Personal Website'
						error={errors.socialLinks?.[2]?.url?.message}
						{...register('socialLinks.2.url')}
					/>
					<TextField
						placeholder='https://www.example.com'
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
