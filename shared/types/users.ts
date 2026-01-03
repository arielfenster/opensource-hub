import type { SocialAuthProviderId } from './auth';

export const userRoleValues = ['User', 'Admin'] as const;
export type UserRole = (typeof userRoleValues)[number];

export const socialLinkTypeValues = [
	'Github',
	'Facebook',
	'Linkedin',
	'Personal Website',
	'Other',
] as const;
export type SocialLinkType = (typeof socialLinkTypeValues)[number];

export type SocialLink = {
	id: string;
	url: string;
	type: SocialLinkType;
	userId: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	bio: string | null;
	imageUrl: string | null;
	googleId: string | null;
	githubId: string | null;
	gitlabId: string | null;
	role: 'User' | 'Admin';
	createdAt: Date;
	updatedAt: Date;
};

export type PrivateUserInfo = Pick<User, 'password' | 'role' | SocialAuthProviderId>;
type AuthenticatedUser = Omit<User, keyof PrivateUserInfo>;
export type UserDetails = AuthenticatedUser & { socialLinks?: SocialLink[] };
