import { getSessionCookie } from '$/server/lib/auth';
import type { Context } from 'hono';
import { usersService } from './users.service';
import { sessionService } from '../session/session.service';
import type { AuthenticatedUser } from '$/shared/types/users';
import type { UpdatePersonalInfoInput } from '$/shared/schemas/user/update-personal-info.schema';
import { HTTPException } from 'hono/http-exception';
import type { UserWithSocialLinks } from './types';

type UpdatePersonalInfoContext = Context<{}, any, { out: { json: UpdatePersonalInfoInput } }>;

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

		const user = await usersService.findUserWithSocialLinks({ id: session.userId });
		if (!user) {
			return null;
		}

		return this.stripPrivateData(user);
	}

	private stripPrivateData(user: UserWithSocialLinks) {
		const { password, role, ...rest } = user;
		return rest;
	}

	async updatePersonalInfo(c: UpdatePersonalInfoContext) {
		const user = await this.validateUpdatePersonalInfoRequest(c);
		const payload = c.req.valid('json');

		const updatedUser = await usersService.updatePersonalInfo(user.id, payload);
		return this.stripPrivateData(updatedUser);
	}

	private async validateUpdatePersonalInfoRequest(c: UpdatePersonalInfoContext) {
		const user = (await this.getCurrentUser(c))!;

		const { email: inputEmail } = c.req.valid('json');

		const userWithEmail = await usersService.findUser({ email: inputEmail });
		if (userWithEmail && userWithEmail.id !== user.id) {
			throw new HTTPException(409, { message: 'Email already exists' });
		}

		return user;
	}
}

export const usersHandler = new UsersHandler();
