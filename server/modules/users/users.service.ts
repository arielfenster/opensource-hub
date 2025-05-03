import type { SignupInput } from '$/shared/schemas/auth/signup.schema';
import type { FindUserParams, FindUserUniqueIdentifier } from './types';
import { usersDataAccessor } from './users.data-accessor';

class UsersService {
	async findUser(params: FindUserParams) {
		const keys = Object.keys(params);
		if (keys.length === 0) {
			return null;
		}

		const searchKey = keys[0] as FindUserUniqueIdentifier;
		return usersDataAccessor.findUserByUniqueIdentifier(searchKey, params[searchKey] as any);
	}

	async createUser(data: SignupInput) {
		return usersDataAccessor.insertUser(data);
	}
}

export const usersService = new UsersService();
