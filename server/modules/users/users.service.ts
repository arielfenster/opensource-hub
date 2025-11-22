import type { SignupInput } from '$/shared/schemas/auth/signup.schema';
import type { UpdatePersonalInfoInput } from '$/shared/schemas/user/update-personal-info.schema';
import type { UpdateSecurityInfoInput } from '$/shared/schemas/user/update-security-info.schema';
import { passwordService } from '../auth/password.service';
import { executeDataOperation } from '../dal/data-executor';
import { socialLinksDataAccessor } from '../social-links/social-links.data-accessor';
import { CreateUserDTO } from './dto/create-user.dto';
import type {
	CreateSocialAuthUserPayload,
	FindUserParams,
	FindUserUniqueIdentifier,
	UserWithSocialLinks,
} from './types';
import { usersDataAccessor } from './users.data-accessor';

class UsersService {
	async findUser(params: FindUserParams) {
		const keys = Object.keys(params);
		if (keys.length === 0) {
			return null;
		}

		const searchKey = keys[0] as FindUserUniqueIdentifier;
		return usersDataAccessor.findUserByUniqueIdentifier(searchKey, params[searchKey] as any);
	}

	// TODO: remove? just select the user with the socialLinks everytime instead
	async findUserWithSocialLinks(params: FindUserParams) {
		const user = await this.findUser(params);
		if (!user) {
			return null;
		}

		const socialLinks = await socialLinksDataAccessor.getSocialLinksForUser(user.id);

		return { ...user, socialLinks };
	}

	async createUser(data: SignupInput) {
		const createUserDto = CreateUserDTO.create(data);
		return usersDataAccessor.insertUser(createUserDto);
	}

	async checkIfEmailExists(email: string) {
		const user = await usersDataAccessor.findUserByUniqueIdentifier('email', email);
		return !!user;
	}

	async updatePersonalInfo(userId: string, data: UpdatePersonalInfoInput) {
		const { socialLinks, ...userPayload } = data;

		const socialLinksPayload = socialLinks?.filter((socialLink) => !!socialLink.id) || [];

		return executeDataOperation<UserWithSocialLinks>(async ({ users, socialLinks }) => {
			const updatedSocialLinks = await socialLinks.updateSocialLinks(socialLinksPayload);
			const updatedUser = await users.updateUser(userId, userPayload);

			return {
				...updatedUser,
				socialLinks: updatedSocialLinks,
			};
		});
	}

	async updateSecurityInfo(userId: string, data: Pick<UpdateSecurityInfoInput, 'password'>) {
		const hashedPassword = await passwordService.hashPassword(data.password);

		return usersDataAccessor.updateUser(userId, { password: hashedPassword });
	}

	async updateSocialAuthInfo(
		userId: string,
		data: Partial<Pick<FindUserParams, 'googleId' | 'githubId'>>,
	) {
		return usersDataAccessor.updateUser(userId, data);
	}

	async createSocialAuthUser(data: CreateSocialAuthUserPayload) {
		const createUserDto = CreateUserDTO.create({ ...data, password: '' });
		return usersDataAccessor.insertUser(createUserDto);
	}
}

export const usersService = new UsersService();
