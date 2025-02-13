import { Navbar } from '../../../components/navbar';
import { RpcQueryProvider } from '../../../providers/rpc-query-provider';
import { SignupForm } from './form';

export function SignupPage() {
	return (
		<RpcQueryProvider>
			<Navbar />
			<div className='flex justify-center items-center h-screen bg-gray-100'>
				<div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
					<h1 className='text-3xl font-bold mb-6 text-center text-blue-600'>Sign Up</h1>
					<SignupForm />
					<p className='mt-4 text-center'>
						Already have an account?{' '}
						<a
							href='/auth/login'
							className='text-blue-500 hover:text-purple-700 hover:font-bold hover:text-xl duration-500'
						>
							Login
						</a>
					</p>
				</div>
			</div>
		</RpcQueryProvider>
	);
}
