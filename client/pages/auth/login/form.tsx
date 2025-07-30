import { TextField } from '$/client/components/form/textfield';
import { Button } from '$/client/components/ui/button';
import { loginSchema, type LoginInput } from '$/shared/schemas/auth/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type Props = {
	onSubmit: (input: LoginInput) => void;
	loading?: boolean;
	error?: string;
};

export function LoginForm({ onSubmit, error, loading }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-2'>
			<TextField
				label='Email'
				error={errors.email?.message}
				stretch
				required
				placeholder='Enter your email'
				{...register('email')}
			/>
			<TextField
				label='Password'
				type='password'
				stretch
				error={errors.password?.message}
				required
				placeholder='Enter your password'
				{...register('password')}
			/>

			{error && <span>Login error: {error}</span>}

			<Button
				type='submit'
				className='rounded-md bg-blue-500 text-white hover:bg-blue-700'
				loading={loading}
			>
				Login
			</Button>
		</form>
	);
}
