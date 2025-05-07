import { setCookie } from 'hono/cookie';
import { sessionService } from '../session/session.service';
import { usersService } from '../users/users.service';
import { passwordService } from './password.service';
import type { Context } from 'hono';
import type { SignupInput } from '$/shared/schemas/auth/signup.schema';

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

		const session = await sessionService.createSessionForUser(user.id);

		setCookie(
			c,
			'session_id',
			session.id,
			sessionService.getSessionCookieOptions(session.expiresAt),
		);

		return {
			user,
			session,
		};
	}

	private async validateSignupRequest(email: string) {
		const user = await usersService.findUser({ email });
		if (user) {
			throw new Error('Email already exists');
		}
	}
}

export const signupHandler = new SignupHandler();
