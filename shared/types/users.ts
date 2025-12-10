import { type SocialLink, type User } from '$/server/database/schemas';
import type { SocialAuthProviderId } from './auth';

export type PrivateUserInfo = Pick<User, 'password' | 'role' | SocialAuthProviderId>;
type AuthenticatedUser = Omit<User, keyof PrivateUserInfo>;
export type UserDetails = AuthenticatedUser & { socialLinks?: SocialLink[] };

export const socialLinkTypeValues = [
	'Github',
	'Facebook',
	'Linkedin',
	'Personal Website',
	'Other',
] as const;

export type SocialLinkType = (typeof socialLinkTypeValues)[number];
