import type { SignupInput } from '$/shared/schemas/auth/signup.schema';
import { db } from '../../database/db';
import { users } from '../../database/schemas';
import type { FindUserUniqueIdentifier } from './types';

class UsersDataAccessor {
	async findUserByUniqueIdentifier(key: FindUserUniqueIdentifier, value: string) {
		return db.query.users
			.findFirst({
				where: (fields, { eq }) => eq(fields[key], value),
			})
			.execute();
	}

	// async findUserById(id: string) {
	// 	return db.query.users
	// 		.findFirst({
	// 			where: (fields, { eq }) => eq(fields.id, id),
	// 		})
	// 		.execute();
	// }

	// async findUserByEmail(email: string) {
	// 	return db.query.users
	// 		.findFirst({
	// 			where: (fields, { eq }) => eq(fields.email, email),
	// 		})
	// 		.execute();
	// }

	async insertUser(data: SignupInput) {
		const [user] = await db.insert(users).values(data).returning();
		return user;
	}
}

export const usersDataAccessor = new UsersDataAccessor();
