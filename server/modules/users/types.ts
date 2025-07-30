import type { SocialLink, User } from '../../database/schemas';

export type FindUserParams = Partial<Pick<User, 'id' | 'email'>>;
export type FindUserUniqueIdentifier = keyof FindUserParams;

export type UserWithSocialLinks = User & { socialLinks: SocialLink[] };
