import type { User } from '../../database/schemas';

export type FindUserParams = Partial<Pick<User, 'id' | 'email'>>;
export type FindUserUniqueIdentifier = 'id' | 'email';
