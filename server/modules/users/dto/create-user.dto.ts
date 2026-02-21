import type { SignupInput } from '$/shared/schemas/auth/signup.schema';
import type { CreateSocialAuthUserPayload } from '../types';

type CreateRegularAuthUserPayload = SignupInput;

type CreateUserPayload = CreateRegularAuthUserPayload & CreateSocialAuthUserPayload;

export class CreateUserDTO {
	private constructor(
		public readonly firstName: string,
		public readonly lastName: string,
		public readonly email: string,
		public readonly password: string,
		public readonly bio?: string,
		public readonly imageUrl?: string,
		public readonly googleId?: string,
		public readonly githubId?: string,
		public readonly gitlabId?: string,
	) {}

	static create(data: CreateUserPayload): CreateUserDTO {
		return new CreateUserDTO(
			data.firstName,
			data.lastName,
			data.email,
			data.password,
			data.bio ?? '',
			data.imageUrl ?? '',
			data.googleId ?? '',
			data.githubId ?? '',
			data.gitlabId ?? '',
		);
	}
}
