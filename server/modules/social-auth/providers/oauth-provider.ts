import type { UserProfile, VerifiedCallbackParams } from '../types';

export interface OauthProvider {
	readonly requiresCodeVerifier: boolean;

	createAuthorizationURL(state: string, codeVerifier?: string): string;

	extractUserProfile(params: VerifiedCallbackParams): Promise<UserProfile>;
}
