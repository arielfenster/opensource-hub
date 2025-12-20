import type { SignupInput } from '$/shared/schemas/auth/signup.schema';
import type { SocialAuthProviderId } from '$/shared/types/auth';
import type { User } from '$/shared/types/users';

export type FindUserParams = Partial<Pick<User, 'id' | 'email' | SocialAuthProviderId>>;
export type FindUserUniqueIdentifier = keyof FindUserParams;

export type CreateSocialAuthUserPayload = Pick<SignupInput, 'firstName' | 'lastName' | 'email'> &
	Partial<Pick<User, 'imageUrl' | SocialAuthProviderId>>;
