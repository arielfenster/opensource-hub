import type { FormEvent } from 'react';
import { useRpcQueryClient } from '../../../providers/rpc-query-provider';

export function SignupForm() {
	const client = useRpcQueryClient();

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const response = await client.auth.signup.$post({
			form: {
				firstName: formData.get('firstName') as string,
				lastName: formData.get('lastName') as string,
				email: formData.get('email') as string,
				password: formData.get('password') as string,
				personalPicture: formData.get('personalPicture') as File,
			},
		});

		const data = await response.json();
		console.log(data);
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className='mb-4'>
				<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='firstName'>
					First Name
				</label>
				<input
					type='text'
					id='firstName'
					name='firstName'
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Enter your first name'
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastName'>
					Last Name
				</label>
				<input
					type='text'
					id='lastName'
					name='lastName'
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Enter your last name'
				/>
			</div>
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
			<div className='mb-6'>
				<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='personalPicture'>
					Personal Picture
				</label>
				<input
					type='file'
					id='personalPicture'
					name='personalPicture'
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				/>
			</div>
			<div className='flex items-center justify-between'>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
				>
					Sign Up
				</button>
			</div>
		</form>
	);
}
