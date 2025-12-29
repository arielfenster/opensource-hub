import { useSocialAuth } from '$/client/hooks/useSocialAuth';
import type { SocialAuthProvider } from '$/shared/types/auth';
import { type JSX } from 'react';
import {
	FaGithub as GithubLogo,
	FaGitlab as GitlabLogo,
	FaGoogle as GoogleLogo,
} from 'react-icons/fa';
import { Button, type ButtonProps } from './button';
import { capitalize } from '$/client/lib/utils';

const SOCIAL_LOGOS: Record<SocialAuthProvider, JSX.Element> = {
	google: <GoogleLogo size={'25px'} />,
	github: <GithubLogo size={'25px'} />,
	gitlab: <GitlabLogo size={'25px'} />,
};

type Props = ButtonProps & {
	provider: SocialAuthProvider;
};

export function SocialAuthButton({ provider, className, ...rest }: Props) {
	const { authenticate } = useSocialAuth();

	function loginWithSocial() {
		authenticate(provider);
	}

	return (
		<Button
			className='text-eerie-black flex h-7 justify-center border-2 border-gray-300 bg-transparent py-5 hover:bg-neutral-200'
			onClick={loginWithSocial}
			{...rest}
		>
			{SOCIAL_LOGOS[provider]}
			{capitalize(provider)}
		</Button>
	);
}
