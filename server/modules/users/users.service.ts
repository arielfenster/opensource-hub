import type { SignupInput } from '$/shared/schemas/auth/signup.schema';
import type { UpdatePersonalInfoInput } from '$/shared/schemas/user/update-personal-info.schema';
import type { UpdateSecurityInfoInput } from '$/shared/schemas/user/update-security-info.schema';
import type { SocialAuthProviderId } from '$/shared/types/auth';
import type { UserDetails } from '$/shared/types/users';
import { passwordService } from '../auth/password.service';
import { executeDataOperation } from '../dal/data-executor';
import { CreateUserDTO } from './dto/create-user.dto';
import { FindUserDTO } from './dto/find-user.dto';
import { SocialLinksDTO } from './dto/social-links.dto';
import type { CreateSocialAuthUserPayload, FindUserParams } from './types';
import { usersDataAccessor } from './users.data-accessor';

class UsersService {
	async findUser(params: FindUserParams) {
		const findUserDto = FindUserDTO.create(params);
		return usersDataAccessor.getUser(findUserDto);
	}

	async findSafeUser(params: FindUserParams) {
		const findUserDto = FindUserDTO.create(params, {
			withTables: { socialLinks: true },
		});
		return usersDataAccessor.getSafeUser(findUserDto);
	}

	async createUser(data: SignupInput) {
		const createUserDto = CreateUserDTO.create(data);
		return usersDataAccessor.insertUser(createUserDto);
	}

	async checkIfEmailExists(email: string) {
		const findUserDto = FindUserDTO.create({ email });
		const user = await usersDataAccessor.getUser(findUserDto);

		return !!user;
	}

	async updatePersonalInfo(userId: string, data: UpdatePersonalInfoInput) {
		const { socialLinks: socialLinksPayload, ...userPayload } = data;

		return executeDataOperation<UserDetails>(async ({ users, socialLinks }) => {
			if (socialLinksPayload) {
				const existingSocialLinks = await socialLinks.getSocialLinksForUser(userId);
				const socialLinksDto = SocialLinksDTO.create(
					socialLinksPayload,
					existingSocialLinks,
				);

				if (socialLinksDto.toAdd.length) {
					await socialLinks.createSocialLinks(userId, socialLinksDto.toAdd);
				}

				if (socialLinksDto.toUpdate.length) {
					await socialLinks.updateSocialLinks(socialLinksDto.toUpdate);
				}

				if (socialLinksDto.toDelete.length) {
					await socialLinks.deleteSocialLinks(socialLinksDto.toDelete);
				}
			}

			return users.updateUser(userId, userPayload);
		});
	}

	async updateSecurityInfo(userId: string, data: Pick<UpdateSecurityInfoInput, 'password'>) {
		const hashedPassword = await passwordService.hashPassword(data.password);

		return usersDataAccessor.updateUser(userId, { password: hashedPassword });
	}

	async updateSocialAuthInfo(
		userId: string,
		data: Partial<Pick<FindUserParams, SocialAuthProviderId>>,
	) {
		return usersDataAccessor.updateUser(userId, data);
	}

	async createSocialAuthUser(data: CreateSocialAuthUserPayload) {
		const createUserDto = CreateUserDTO.create({ ...data, password: '' });
		return usersDataAccessor.insertUser(createUserDto);
	}
}

export const usersService = new UsersService();
