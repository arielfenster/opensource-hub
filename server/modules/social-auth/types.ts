export type CallbackParams = {
	code: string | null;
	state: string | null;
	cookieState?: string;
	cookieCodeVerifier?: string;
};

export type VerifiedCallbackParams = {
	code: string;
	state: string;
	cookieState: string;
	cookieCodeVerifier?: string;
};

export type UserProfile = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	imageUrl?: string;
};
