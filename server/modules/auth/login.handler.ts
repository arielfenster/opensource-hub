import { createUserSession } from '$/server/lib/auth';
import {
	buildOauthCodeVerifierCookieName,
	buildOauthStateCookieName,
	getSocialAuthProviders,
} from '$/server/lib/social-auth';
import type { LoginInput } from '$/shared/schemas/auth/login.schema';
import type { Context } from 'hono';
import { deleteCookie } from 'hono/cookie';
import { SESSION_COOKIE_NAME } from '../session/types';
import { usersService } from '../users/users.service';
import { passwordService } from './password.service';

type LoginContext = Context<{}, any, { out: { json: LoginInput } }>;

class LoginHandler {
	async loginWithEmailPassword(c: LoginContext) {
		const { email, password } = c.req.valid('json');

		const user = await this.validateLoginRequest(email, password);
		const session = await createUserSession(c, user.id);

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

	async logoutUser(c: Context) {
		deleteCookie(c, SESSION_COOKIE_NAME);

		getSocialAuthProviders().forEach((provider) => {
			deleteCookie(c, buildOauthStateCookieName(provider));
			deleteCookie(c, buildOauthCodeVerifierCookieName(provider));
		});
	}
}

export const loginHandler = new LoginHandler();
