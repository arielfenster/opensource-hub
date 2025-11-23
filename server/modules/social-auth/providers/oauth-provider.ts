import type { UserProfile, VerifiedCallbackParams } from '../types';

export interface OauthProvider {
	createAuthorizationURL(state: string, codeVerifier?: string): string;

	extractUserProfile(params: VerifiedCallbackParams): Promise<UserProfile>;
}
