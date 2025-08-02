import type { SocialLink, User } from '$/server/database/schemas';

export type AuthenticatedUser = Omit<User, 'password' | 'role'> & { socialLinks: SocialLink[] };
