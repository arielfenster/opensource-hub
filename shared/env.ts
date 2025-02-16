export const IS_PROD = Bun.env.NODE_ENV === 'production';

export const PORT = 3000;

function createEnv() {
	return {
		server: {
			DATABASE: {
				URL: Bun.env.DATABASE_URL!,
			},
			HOST_URL: IS_PROD ? 'https://hono-ssr-test.onrender.com' : `http://localhost:${PORT}`,
			PORT,
		},
	};
}

export const env = createEnv();
