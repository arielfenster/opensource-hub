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
		port: env.server.PORT,
	},
	plugins: [
		tailwindcss(),
		devServer({
			entry: 'server/index.ts',
			adapter: bunAdapter,
		}),
	],
	// ssr: {
	// 	external: ['react', 'react-dom', 'react-dom/client', 'hono'],
	// },
	resolve: {
		alias: {
			'$/shared': resolve(__dirname, './shared'),
			'$/client': resolve(__dirname, './client'),
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
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'react-dom/client': 'ReactDOM',
				},
				inlineDynamicImports: false,
			},
			jsx: {
				preset: 'react-jsx',
				jsxImportSource: 'react',
			},
			external: ['react', 'react-dom', 'react-dom/client'],
		},
	},
});
