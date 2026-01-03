import { SocialAuthBlock } from '$/client/components/blocks/social-auth';
import type { SignupInput } from '$/shared/schemas/auth/signup.schema';
import { SignupForm } from './form';

type SignupViewProps = {
	signup: (data: SignupInput) => void;
	loading: boolean;
	error?: string;
};

export function SignupView({ signup, loading, error }: SignupViewProps) {
	return (
		<div className='mt-14 flex h-screen items-center justify-center'>
			<div className='w-full max-w-lg rounded bg-white p-8 shadow-md'>
				<h1 className='mb-6 text-center text-3xl font-bold text-blue-600'>Sign Up</h1>
				<SignupForm onSubmit={signup} loading={loading} error={error} />
				<SocialAuthBlock />
				<p className='mt-4 text-center'>
					Already have an account?{' '}
					<a href='/login' className='text-blue-500 hover:text-blue-700'>
						Login
					</a>
				</p>
			</div>
		</div>
	);
}
