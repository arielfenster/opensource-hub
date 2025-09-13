import { STATIC_OUTPUT_DIR_PATH } from '$/shared/constants';
import { existsSync, readFileSync } from 'fs';
import { buildEntryInputName, type AppPage } from './paths';

type ManifestJsEntryObject = {
	file: string;
	name: string;
	src: string;
	isEntry: boolean;
	imports?: string[];
	css?: string[];
};
type ManifestCssEntryObject = {
	file: string;
	src: string;
};

type ManifestEntryObject = ManifestJsEntryObject | ManifestCssEntryObject;

export type PageScripts = {
	js: string[];
	css: string[];
};

function getManifestFile(): Record<string, ManifestEntryObject> {
	const manifestPath = `${STATIC_OUTPUT_DIR_PATH}/.vite/manifest.json`;

	if (!existsSync(manifestPath)) {
		throw new Error('Manifest file not found');
	}

	const file = readFileSync(manifestPath, 'utf-8');
	return JSON.parse(file);
}

export const manifest = getManifestFile();

export function getScriptsFromManifest(page: AppPage): PageScripts {
	if (!manifest) {
		console.log('%cManifest file not found. Cannot continue%s', 'color: red');
		process.exit(1);
	}

	const pageEntryKey = buildEntryInputName(page);

	return {
		js: getPageJsImports(pageEntryKey),
		css: getPageCssImports(pageEntryKey),
	};
}

function getPageJsImports(pageEntryKey: string) {
	const visitedEntries = new Set<string>();
	const imports: string[] = [];

	function traverse(entryKey: string) {
		if (visitedEntries.has(entryKey)) {
			return;
		}

		const entryObject = manifest[entryKey] as ManifestJsEntryObject;
		imports.push(entryObject.file);

		entryObject.imports?.forEach(traverse);

		visitedEntries.add(entryKey);
	}

	traverse(pageEntryKey);

	return imports.map((path) => `/${STATIC_OUTPUT_DIR_PATH}/${path}`);
}

function getPageCssImports(pageEntryKey: string) {
	const entryObject = manifest[pageEntryKey] as ManifestJsEntryObject;

	return entryObject.css?.map((path) => `/${STATIC_OUTPUT_DIR_PATH}/${path}`) || [];
}
