import type { SocialLink, User } from '$/server/database/schemas';
import type { SocialAuthProviderId } from './auth';

export type PrivateUserInfo = Pick<User, 'password' | 'role' | SocialAuthProviderId>;
export type AuthenticatedUser = Omit<User, keyof PrivateUserInfo> & { socialLinks: SocialLink[] };
