import type { FormEvent } from 'react';
import { useRpcQueryClient } from '../../../providers/rpc-query-provider';

export function SignupForm() {
	const client = useRpcQueryClient();

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const response = await client.auth.signup.$post({
			json: {
				firstName: formData.get('firstName') as string,
				lastName: formData.get('lastName') as string,
				email: formData.get('email') as string,
				password: formData.get('password') as string,
				// personalPicture: formData.get('personalPicture') as File,
			},
		});

		const data = await response.json();
		console.log(data);
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className='mb-4'>
				<label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='firstName'>
					First Name
				</label>
				<input
					type='text'
					id='firstName'
					name='firstName'
					className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
					placeholder='Enter your first name'
				/>
			</div>
			<div className='mb-4'>
				<label className='mb-2 block text-sm font-bold text-gray-700' htmlFor='lastName'>
					Last Name
				</label>
				<input
					type='text'
					id='lastName'
					name='lastName'
					className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
					placeholder='Enter your last name'
				/>
			</div>
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
			<div className='mb-6'>
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
			</div>
			<div className='flex items-center justify-between'>
				<button
					type='submit'
					className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
				>
					Sign Up
				</button>
			</div>
		</form>
	);
}
