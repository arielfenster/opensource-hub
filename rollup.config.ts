import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import type { RollupOptions } from 'rollup';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';
import { PAGES, STATIC_CSS_FILE_PATH, STATIC_JS_PATH } from './shared/constants';
import tailwindConfig from './tailwind.config';

const configs: RollupOptions[] = PAGES.map((page) => ({
	watch: {
		chokidar: {
			cwd: 'client/**',
		},
	},
	input: `client/roots/${page}.tsx`,
	output: {
		file: `${STATIC_JS_PATH}/${page}.js`,
		format: 'iife',
		sourcemap: true,
		name: page,
		extend: true,
		globals: {
			react: 'React',
			'react-dom': 'ReactDOM',
			'react-dom/client': 'ReactDOM',
		},
	},
	plugins: [
		replace({
			preventAssignment: true,
			values: {
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
			},
		}),
		resolve(),
		commonjs(),
		url(),
		babel({ babelHelpers: 'bundled', presets: ['@babel/preset-react'] }),
		typescript(),
		terser(),
	],
	external: ['react', 'react-dom', 'react-dom/client', /\.css$/],
}));

configs.push({
	input: 'client/index.css',
	output: {
		file: STATIC_CSS_FILE_PATH,
		format: 'es',
	},
	plugins: [
		postcss({
			extensions: ['.css'],
			plugins: [tailwindcss(tailwindConfig)],
			extract: true,
			minimize: true,
		}),
	],
});

export default configs;
