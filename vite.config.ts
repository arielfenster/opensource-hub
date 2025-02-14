import devServer, { defaultOptions } from '@hono/vite-dev-server';
import bunAdapter from '@hono/vite-dev-server/bun';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { STATIC_DIR } from './shared/constants';
import { PORT } from './shared/env';

export default defineConfig({
	server: {
		port: PORT,
	},
	plugins: [
		devServer({
			entry: 'server/index.ts',
			adapter: bunAdapter,
			exclude: [`/${STATIC_DIR}/*`, ...defaultOptions.exclude],
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
