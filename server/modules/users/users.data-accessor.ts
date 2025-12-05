import type { PrivateUserInfo, UserDetails } from '$/shared/types/users';
import { eq } from 'drizzle-orm';
import { db } from '../../database/db';
import { users, type User } from '../../database/schemas';
import { DataAccessor } from '../dal/data-accessor';
import type { CreateUserDTO } from './dto/create-user.dto';
import { FindUserDTO } from './dto/find-user.dto';

export class UsersDataAccessor extends DataAccessor {
	async getUser(dto: FindUserDTO) {
		return this.db.query.users
			.findFirst({
				where: (fields, { eq }) => eq(fields[dto.key], dto.value),
				with: dto.withTables,
			})
			.execute();
	}

	async getSafeUser(dto: FindUserDTO) {
		return this.db.query.users
			.findFirst({
				where: (fields, { eq }) => eq(fields[dto.key], dto.value),
				with: dto.withTables,
				columns: this.getPrivateColumnsToExclude(),
			})
			.execute();
	}

	async insertUser(dto: CreateUserDTO) {
		const [user] = await this.db.insert(users).values(dto).returning();

		const findUserDto = FindUserDTO.create(
			{ id: user.id },
			{ withTables: { socialLinks: true } },
		);

		return this.getSafeUser(findUserDto) as Promise<UserDetails>;
	}

	async updateUser(id: string, data: Partial<Omit<User, 'id'>>) {
		const [updatedUser] = await this.db
			.update(users)
			.set(data)
			.where(eq(users.id, id))
			.returning();

		const findUserDto = FindUserDTO.create(
			{ id: updatedUser.id },
			{ withTables: { socialLinks: true } },
		);

		return this.getSafeUser(findUserDto) as Promise<UserDetails>;
	}

	private getPrivateColumnsToExclude(): Record<keyof PrivateUserInfo, boolean> {
		return {
			password: false,
			role: false,
			googleId: false,
			githubId: false,
			gitlabId: false,
		};
	}
}

export const usersDataAccessor = new UsersDataAccessor(db);
