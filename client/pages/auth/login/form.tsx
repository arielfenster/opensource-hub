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
				<label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='email'>
					Email
				</label>
				<input
					type='email'
					id='email'
					name='email'
					className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
					placeholder='Enter your email'
				/>
			</div>
			<div className='mb-6'>
				<label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='password'>
					Password
				</label>
				<input
					type='password'
					id='password'
					name='password'
					className='focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
					placeholder='Enter your password'
				/>
			</div>
			<div className='flex items-center justify-between'>
				<button
					type='submit'
					className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
				>
					Login
				</button>
			</div>
		</form>
	);
}
