export const IS_PROD = Bun.env.NODE_ENV === 'production';

function createEnv() {
	return {
		server: {
			DATABASE: {
				URL: Bun.env.DATABASE_URL!,
			},
			HOST_URL: Bun.env.VITE_HOST_URL!,
			PORT: parseInt(Bun.env.PORT!, 10),
			SESSION_COOKIE_NAME: Bun.env.SESSION_COOKIE_NAME!,
		},
	};
}

export const env = createEnv();
