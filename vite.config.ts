import devServer from '@hono/vite-dev-server';
import bunAdapter from '@hono/vite-dev-server/bun';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { PORT } from './shared/env';

export default defineConfig({
	server: {
		port: PORT,
	},
	plugins: [
		tailwindcss(),
		devServer({
			entry: 'server/index.ts',
			adapter: bunAdapter,
		}),
	],
	ssr: {
		external: ['react', 'react-dom', 'react-dom/client', 'hono'],
	},
	resolve: {
		alias: {
			'$/shared': resolve(__dirname, './shared'),
			'$/client': resolve(__dirname, './client'),
		},
	},
});
