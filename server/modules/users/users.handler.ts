import type { UpdatePersonalInfoInput } from '$/shared/schemas/user/update-personal-info.schema';
import type { UpdateSecurityInfoInput } from '$/shared/schemas/user/update-security-info.schema';
import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { passwordService } from '../auth/password.service';
import { sessionService } from '../session/session.service';
import { usersService } from './users.service';

type UpdatePersonalInfoContext = Context<{}, any, { out: { json: UpdatePersonalInfoInput } }>;

type UpdateSecurityInfoContext = Context<{}, any, { out: { json: UpdateSecurityInfoInput } }>;

class UsersHandler {
	async getCurrentUser(c: Context) {
		const userId = await sessionService.getCurrentUserId(c);
		if (!userId) {
			return null;
		}

		return usersService.findUser({ id: userId });
	}

	async getSafeCurrentUser(c: Context) {
		const userId = await sessionService.getCurrentUserId(c);
		if (!userId) {
			return null;
		}

		return usersService.findSafeUser({ id: userId });
	}

	async updatePersonalInfo(c: UpdatePersonalInfoContext) {
		const user = await this.validateUpdatePersonalInfoRequest(c);
		const payload = c.req.valid('json');

		return usersService.updatePersonalInfo(user.id, payload);
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

		return usersService.updateSecurityInfo(user.id, payload);
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
