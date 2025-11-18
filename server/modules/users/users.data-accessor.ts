import type { SignupInput } from '$/shared/schemas/auth/signup.schema';
import { eq } from 'drizzle-orm';
import { db } from '../../database/db';
import { users, type User } from '../../database/schemas';
import { DataAccessor } from '../dal/data-accessor';
import type { FindUserUniqueIdentifier } from './types';

export class UsersDataAccessor extends DataAccessor {
	async findUserByUniqueIdentifier(key: FindUserUniqueIdentifier, value: string) {
		return this.db.query.users
			.findFirst({
				where: (fields, { eq }) => eq(fields[key], value),
			})
			.execute();
	}

	async insertUser(data: SignupInput) {
		const [user] = await db.insert(users).values(data).returning();
		return user;
	}

	async updateUser(id: string, data: Partial<Omit<User, 'id'>>) {
		const [updatedUser] = await db.update(users).set(data).where(eq(users.id, id)).returning();
		return updatedUser;
	}
}

export const usersDataAccessor = new UsersDataAccessor(db);
