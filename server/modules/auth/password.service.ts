import { hash, genSalt, compare } from 'bcrypt';

class PasswordService {
	async hashPassword(password: string) {
		return hash(password, await genSalt());
	}

	async comparePasswords(plain: string, hashed: string) {
		return compare(plain, hashed);
	}
}

export const passwordService = new PasswordService();
