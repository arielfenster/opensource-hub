import { SocialAuthButton } from '../ui/social-auth-button';

export function SocialAuthBlock() {
	return (
		<div className='my-6 flex flex-col gap-3'>
			<div className='flex items-center justify-between gap-3'>
				<span className='h-[1px] w-full border border-gray-300' />
				<p className='text-center text-gray-500'>OR</p>
				<span className='h-[1px] w-full border border-gray-300' />
			</div>
			<p className='text-center text-gray-500'>Continue with</p>
			<SocialAuthButton provider='Google' />
			<SocialAuthButton provider='Github' />
			<SocialAuthButton provider='Gitlab' />
		</div>
	);
}
