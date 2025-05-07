import { LoginForm } from './form';
import { useLogin } from './hook';

export function LoginContainer() {
	const { login, loading, error } = useLogin();

	return (
		<div className='mt-14 flex justify-center'>
			<div className='w-full max-w-lg rounded bg-white p-8 shadow-xl'>
				<h1 className='mb-6 text-center text-3xl font-bold text-blue-600'>Login</h1>
				<LoginForm onSubmit={(input) => login(input)} loading={loading} error={error} />
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
