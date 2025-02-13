export const IS_PROD = process.env.NODE_ENV === 'production';

const PORT = 3000;

function createEnv() {
	return {
		server: {
			HOST_URL: IS_PROD ? 'https://hono-ssr-test.onrender.com' : `http://localhost:${PORT}`,
			PORT,
		},
	};
}

export const env = createEnv();
