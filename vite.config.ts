import devServer from '@hono/vite-dev-server';
import bunAdapter from '@hono/vite-dev-server/bun';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { PAGES, buildEntryInputName } from './build-utils/paths';
import { STATIC_OUTPUT_DIR_PATH } from './shared/constants';
import { env } from './shared/env';

export default defineConfig({
	server: {
		port: env.PORT,
	},
	plugins: [
		tailwindcss(),
		devServer({
			entry: 'server/index.ts',
			adapter: bunAdapter,
		}),
	],
	resolve: {
		alias: {
			'$/server': resolve(__dirname, './server'),
			'$/client': resolve(__dirname, './client'),
			'$/shared': resolve(__dirname, './shared'),
			'$/build-utils': resolve(__dirname, './build-utils'),
		},
	},
	build: {
		manifest: true,
		sourcemap: true,
		rollupOptions: {
			input: PAGES.map(buildEntryInputName),
			output: {
				dir: `${STATIC_OUTPUT_DIR_PATH}`,
				entryFileNames: '[name]-[hash].js',
				assetFileNames: '[name]-[hash][extname]',
				chunkFileNames: '[name]-[hash].js',
				format: 'es',
				extend: true,
				inlineDynamicImports: false,
			},
			external: [
				'react',
				'react-dom/client',
				'react/jsx-runtime',
				'drizzle-orm',
				/^drizzle-orm\/.*/,
				'$/server/database/schemas',
			],
		},
	},
});
