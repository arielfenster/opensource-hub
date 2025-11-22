import { eq } from 'drizzle-orm';
import { db } from '../../database/db';
import { users, type User } from '../../database/schemas';
import { DataAccessor } from '../dal/data-accessor';
import type { CreateUserDTO } from './dto/create-user.dto';
import type { FindUserUniqueIdentifier } from './types';

export class UsersDataAccessor extends DataAccessor {
	async findUserByUniqueIdentifier(key: FindUserUniqueIdentifier, value: string) {
		return this.db.query.users
			.findFirst({
				where: (fields, { eq }) => eq(fields[key], value),
			})
			.execute();
	}

	async insertUser(dto: CreateUserDTO) {
		const [user] = await this.db.insert(users).values(dto).returning();
		return user;
	}

	async updateUser(id: string, data: Partial<Omit<User, 'id'>>) {
		const [updatedUser] = await this.db
			.update(users)
			.set(data)
			.where(eq(users.id, id))
			.returning();
		return updatedUser;
	}
}

export const usersDataAccessor = new UsersDataAccessor(db);
