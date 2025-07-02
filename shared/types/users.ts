import type { User } from '$/server/database/schemas';

export type AuthenticatedUser = Omit<User, 'password' | 'role'>;
