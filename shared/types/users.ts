import type { SocialLink, User } from '$/server/database/schemas';
import type { SocialAuthProviderId } from './auth';

export type PrivateUserInfo = Pick<User, 'password' | 'role' | SocialAuthProviderId>;
type AuthenticatedUser = Omit<User, keyof PrivateUserInfo>;
export type UserDetails = AuthenticatedUser & { socialLinks?: SocialLink[] };
