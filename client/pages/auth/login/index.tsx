import { Layout } from '$/client/components/layout';
import { RpcQueryProvider } from '$/client/providers/rpc-query-provider';
import { LoginForm } from './form';

export function LoginPage() {
	return (
		<Layout>
			<RpcQueryProvider>
				<div className='flex items-center justify-center'>
					<div className='w-full max-w-md rounded bg-white p-8 shadow-md'>
						<h1 className='mb-6 text-center text-3xl font-bold text-blue-600'>Login</h1>
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
		</Layout>
	);
}
