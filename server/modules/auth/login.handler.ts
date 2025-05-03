import { setCookie } from 'hono/cookie';
import { sessionService } from '../session/session.service';
import { usersService } from '../users/users.service';
import { passwordService } from './password.service';
import type { Context } from 'hono';
import type { LoginInput } from '$/shared/schemas/auth/login.schema';

type LoginContext = Context<{}, any, { out: { json: LoginInput } }>;

class LoginHandler {
	async loginWithEmailPassword(c: LoginContext) {
		const { email, password } = c.req.valid('json');

		const user = await this.validateLoginRequest(email, password);
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

	private async validateLoginRequest(email: string, password: string) {
		const user = await usersService.findUser({ email });
		if (!user) {
			throw new Error('Email not found');
		}

		const doPasswordsMatch = await passwordService.comparePasswords(password, user.password);
		if (!doPasswordsMatch) {
			throw new Error('Invalid password');
		}

		return user;
	}
}

export const loginHandler = new LoginHandler();
