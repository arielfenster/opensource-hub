import { randomBytes } from 'crypto';
import { sessionDataAccessor } from './session.data-accessor';
import type { CookieOptions } from 'hono/utils/cookie';

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
}

export const sessionService = new SessionService();
