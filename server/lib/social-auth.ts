import { env } from '$/shared/env';
import type { SocialAuthProvider } from '$/shared/types/auth';

export function buildOauthStateCookieName(provider: SocialAuthProvider) {
	return `${provider}_oauth_state`;
}

export function buildOauthCodeVerifierCookieName(provider: SocialAuthProvider) {
	return `${provider}_oauth_code_verifier`;
}

export function buildOauthCallbackUrl(provider: SocialAuthProvider) {
	return `${env.HOST_URL}/api/social-auth/${provider}/callback`;
}

export function getSocialAuthProviders(): SocialAuthProvider[] {
	return ['google', 'github', 'gitlab'];
}
