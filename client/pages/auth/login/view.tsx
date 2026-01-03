import { SocialAuthBlock } from '$/client/components/blocks/social-auth';
import type { LoginInput } from '$/shared/schemas/auth/login.schema';
import { LoginForm } from './form';

type LoginViewProps = {
	login: (data: LoginInput) => void;
	loading: boolean;
	error?: string;
};

export function LoginView({ login, loading, error }: LoginViewProps) {
	return (
		<div className='mt-14 flex justify-center'>
			<div className='w-full max-w-lg rounded bg-white p-8 shadow-xl'>
				<h1 className='mb-6 text-center text-3xl font-bold text-blue-600'>Login</h1>
				<LoginForm onSubmit={login} loading={loading} error={error} />
				<SocialAuthBlock />
				<p className='mt-4 text-center'>
					Don't have an account?{' '}
					<a href='/signup' className='text-blue-500 hover:text-blue-700'>
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}
