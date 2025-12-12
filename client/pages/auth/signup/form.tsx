import { PasswordField } from '$/client/components/form/password-field';
import { TextField } from '$/client/components/form/textfield';
import { Button } from '$/client/components/ui/button';
import { signupSchema, type SignupInput } from '$/shared/schemas/auth/signup.schema';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';

type Props = {
	onSubmit: (input: SignupInput) => void;
	loading?: boolean;
	error?: string;
};

export function SignupForm({ onSubmit, loading, error }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupInput>({
		resolver: valibotResolver(signupSchema),
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-stretch gap-2'>
			<TextField
				label='First Name'
				error={errors.firstName?.message}
				required
				placeholder='Enter your first name'
				{...register('firstName')}
			/>

			<TextField
				label='Last Name'
				error={errors.lastName?.message}
				required
				placeholder='Enter your last name'
				{...register('lastName')}
			/>

			<TextField
				label='Email'
				error={errors.email?.message}
				required
				placeholder='Enter your email'
				{...register('email')}
			/>

			<PasswordField error={errors.password?.message} required {...register('password')} />

			{/* <div className='my-2'>
				<label
					className='mb-2 block text-sm font-bold text-gray-700'
					htmlFor='personalPicture'
				>
					Personal Picture
				</label>
				<input
					type='file'
					id='personalPicture'
					name='personalPicture'
					className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
				/>
			</div> */}

			{error && <span>Signup error: {error}</span>}

			<Button
				type='submit'
				className='self-center rounded-md bg-blue-500 text-white hover:bg-blue-700'
				loading={loading}
			>
				Sign Up
			</Button>
		</form>
	);
}
