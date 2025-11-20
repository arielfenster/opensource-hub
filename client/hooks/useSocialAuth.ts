import type { SocialAuthProvider } from '$/shared/types/auth';

const SOCIAL_AUTH_MAPPING: Record<SocialAuthProvider, string> = {
	Google: import.meta.env.VITE_GOOGLE_AUTH_API_PATH,
	Github: import.meta.env.VITE_GITHUB_AUTH_API_PATH,
	Gitlab: import.meta.env.VITE_GITLAB_AUTH_API_PATH,
};

export function useSocialAuth() {
	function authenticate(provider: SocialAuthProvider) {
		const authProviderUrl = SOCIAL_AUTH_MAPPING[provider];

		const url = `${import.meta.env.VITE_HOST_URL}${authProviderUrl}`;

		window.open(url, '_self');
	}

	return { authenticate };
}
