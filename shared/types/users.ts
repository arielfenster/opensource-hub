import { socialLinkTypeEnum, type SocialLink, type User } from '$/server/database/schemas';
import type { SocialAuthProviderId } from './auth';

export type PrivateUserInfo = Pick<User, 'password' | 'role' | SocialAuthProviderId>;
type AuthenticatedUser = Omit<User, keyof PrivateUserInfo>;
export type UserDetails = AuthenticatedUser & { socialLinks?: SocialLink[] };

export const socialLinkTypes = [...socialLinkTypeEnum.enumValues];
export type SocialLinkType = SocialLink['type'];
