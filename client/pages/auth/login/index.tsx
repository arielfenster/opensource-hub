import { Navbar } from '../../../components/navbar';
import { RpcQueryProvider } from '../../../providers/rpc-query-provider';
import { LoginForm } from './form';

export function LoginPage() {
	return (
		<RpcQueryProvider>
			<Navbar />
			<div className='flex justify-center items-center h-screen bg-gray-100'>
				<div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
					<h1 className='text-3xl font-bold mb-6 text-center text-blue-600'>Login</h1>
					<LoginForm />
					<p className='mt-4 text-center'>
						Don't have an account?{' '}
						<a href='/signup' className='text-blue-500 hover:text-blue-700'>
							Sign up
						</a>
					</p>
				</div>
			</div>
		</RpcQueryProvider>
	);
}
