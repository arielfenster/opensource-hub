import { createUserSession } from '$/server/lib/auth';
import type { SignupInput } from '$/shared/schemas/auth/signup.schema';
import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { usersService } from '../users/users.service';
import { passwordService } from './password.service';

type SignupContext = Context<{}, any, { out: { json: SignupInput } }>;

class SignupHandler {
	async signupWithEmailPassword(c: SignupContext) {
		const { firstName, lastName, email, password } = c.req.valid('json');

		await this.validateSignupRequest(email);

		const hashedPassword = await passwordService.hashPassword(password);
		const user = await usersService.createUser({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		const session = await createUserSession(c, user.id);

		return {
			user,
			session,
		};
	}

	private async validateSignupRequest(email: string) {
		if (await usersService.checkIfEmailExists(email)) {
			throw new HTTPException(409, { message: 'Email already exists' });
		}
	}
}

export const signupHandler = new SignupHandler();
