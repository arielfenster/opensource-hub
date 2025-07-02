import { getSessionCookie } from '$/server/lib/auth';
import type { Context } from 'hono';
import { usersService } from './users.service';
import { sessionService } from '../session/session.service';
import type { User } from '$/server/database/schemas';
import type { AuthenticatedUser } from '$/shared/types/users';

class UsersHandler {
	async getCurrentUser(c: Context): Promise<AuthenticatedUser | null> {
		const sessionCookie = getSessionCookie(c);
		if (!sessionCookie) {
			return null;
		}

		const session = await sessionService.getSessionById(sessionCookie);
		if (!session) {
			return null;
		}

		const user = await usersService.findUser({ id: session.userId });
		if (!user) {
			return null;
		}

		return this.stripPrivateData(user);
	}

	private stripPrivateData(user: User) {
		const { password, role, ...rest } = user;
		return rest;
	}
}

export const usersHandler = new UsersHandler();
