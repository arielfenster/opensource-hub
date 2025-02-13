import type { FormEvent } from 'react';
import { useRpcQueryClient } from '../../../providers/rpc-query-provider';

export function LoginForm() {
	const client = useRpcQueryClient();

	async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const response = await client.auth.login.$post({ json: { email, password } });
		if (response.redirected) {
			window.location.href = response.url;
		} else {
			const data = await response.json();
			console.error(data);
		}
	}

	return (
		<form onSubmit={handleFormSubmit}>
			<div className='mb-4'>
				<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
					Email
				</label>
				<input
					type='email'
					id='email'
					name='email'
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Enter your email'
				/>
			</div>
			<div className='mb-6'>
				<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
					Password
				</label>
				<input
					type='password'
					id='password'
					name='password'
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Enter your password'
				/>
			</div>
			<div className='flex items-center justify-between'>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
				>
					Login
				</button>
			</div>
		</form>
	);
}
