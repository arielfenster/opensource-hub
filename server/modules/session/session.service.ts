import { randomBytes } from 'crypto';
import { sessionDataAccessor } from './session.data-accessor';
import type { CookieOptions } from 'hono/utils/cookie';
import type { Context } from 'hono';
import { getSessionCookie } from '$/server/lib/auth';
import { usersService } from '../users/users.service';

class SessionService {
	private SESSION_EXPIRATION_TIME_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

	async createSessionForUser(userId: string) {
		const sessionId = this.generateSessionId();
		const expirationTime = Date.now() + this.SESSION_EXPIRATION_TIME_MS;

		return sessionDataAccessor.insertSession({
			id: sessionId,
			userId,
			expiresAt: expirationTime,
		});
	}

	private generateSessionId() {
		return randomBytes(16).toString('base64url');
	}

	getSessionCookieOptions(expiresAt: number): CookieOptions {
		return {
			httpOnly: true,
			secure: true,
			expires: new Date(expiresAt),
			sameSite: 'Strict',
		};
	}

	async getSessionById(sessionId: string) {
		return sessionDataAccessor.findSessionById(sessionId);
	}

	// TODO: implement?
	// async getCurrentUser(c: Context) {
	// 	const sessionCookie = getSessionCookie(c);
	// 	if (!sessionCookie) {
	// 		return null;
	// 	}

	// 	const session = await sessionService.getSessionById(sessionCookie);
	// 	if (!session) {
	// 		return null;
	// 	}

	// 	return usersService.findUser({ id: session.userId });
	// }

	async getCurrentUserId(c: Context) {
		const sessionCookie = getSessionCookie(c);
		if (!sessionCookie) {
			return null;
		}

		const session = await sessionService.getSessionById(sessionCookie);
		if (!session) {
			return null;
		}

		return session.userId;
	}
}

export const sessionService = new SessionService();
