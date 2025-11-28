import { getSessionCookie } from '$/server/lib/auth';
import type { UpdatePersonalInfoInput } from '$/shared/schemas/user/update-personal-info.schema';
import type { UpdateSecurityInfoInput } from '$/shared/schemas/user/update-security-info.schema';
import type { AuthenticatedUser } from '$/shared/types/users';
import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { sessionService } from '../session/session.service';
import { usersService } from './users.service';
import type { User } from '$/server/database/schemas';
import { passwordService } from '../auth/password.service';

type UpdatePersonalInfoContext = Context<{}, any, { out: { json: UpdatePersonalInfoInput } }>;

type UpdateSecurityInfoContext = Context<{}, any, { out: { json: UpdateSecurityInfoInput } }>;

class UsersHandler {
	async getCurrentUser(c: Context): Promise<User | null> {
		const sessionCookie = getSessionCookie(c);
		if (!sessionCookie) {
			return null;
		}

		const session = await sessionService.getSessionById(sessionCookie);
		if (!session) {
			return null;
		}

		return usersService.findUserWithSocialLinks({ id: session.userId });
	}

	async getSafeCurrentUser(c: Context): Promise<AuthenticatedUser | null> {
		const user = await this.getCurrentUser(c);
		if (!user) {
			return null;
		}

		return this.stripPrivateData(user) as AuthenticatedUser;
	}

	private stripPrivateData<TUser extends User>(user: TUser) {
		const { password, githubId, gitlabId, googleId, role, id, ...rest } = user;
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

	async updateSecurityInfo(c: UpdateSecurityInfoContext) {
		const user = await this.validateUpdateSecurityInfoRequest(c);
		const payload = c.req.valid('json');

		const updatedUser = await usersService.updateSecurityInfo(user.id, payload);
		return this.stripPrivateData(updatedUser);
	}

	private async validateUpdateSecurityInfoRequest(c: UpdateSecurityInfoContext) {
		const user = (await this.getCurrentUser(c))!;
		const { password } = c.req.valid('json');

		const isCurrentPasswordCorrect = await passwordService.comparePasswords(
			password,
			user.password,
		);

		if (!isCurrentPasswordCorrect) {
			throw new HTTPException(400, { message: 'Current password is incorrect' });
		}

		return user;
	}
}

export const usersHandler = new UsersHandler();
