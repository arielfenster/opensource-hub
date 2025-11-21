export const IS_PROD = Bun.env.NODE_ENV === 'production';

function createEnv() {
	return {
		DATABASE: {
			URL: Bun.env.DATABASE_URL!,
		},
		HOST_URL: Bun.env.VITE_HOST_URL!,
		PORT: parseInt(Bun.env.PORT!, 10),
		SESSION_COOKIE_NAME: Bun.env.SESSION_COOKIE_NAME!,

		SOCIAL_AUTH: {
			GOOGLE_CLIENT_ID: Bun.env.GOOGLE_CLIENT_ID!,
			GOOGLE_CLIENT_SECRET: Bun.env.GOOGLE_CLIENT_SECRET!,

			GITHUB_CLIENT_ID: Bun.env.GITHUB_CLIENT_ID!,
			GITHUB_CLIENT_SECRET: Bun.env.GITHUB_CLIENT_SECRET!,

			GITLAB_CLIENT_ID: Bun.env.GITLAB_CLIENT_ID!,
			GITLAB_CLIENT_SECRET: Bun.env.GITLAB_CLIENT_SECRET!,
		},
	};
}

export const env = createEnv();
