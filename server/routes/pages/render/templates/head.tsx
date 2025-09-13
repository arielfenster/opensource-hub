import type { PageScripts } from '$/build-utils/manifest';
import { IS_PROD } from '$/shared/env';

export type HeadProps = {
	title?: string;
	pageScripts: PageScripts;
};

export function Head({ title, pageScripts }: HeadProps) {
	function getReactSrc() {
		const importMap = {
			imports: {
				react: 'https://esm.sh/react@18.2.0',
				'react-dom/client': 'https://esm.sh/react-dom@18.2.0/client',
				'react/jsx-runtime': 'https://esm.sh/react@18.2.0/jsx-runtime',
			},
		};

		return (
			<script
				type='importmap'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(importMap, null, 2) }}
			/>
		);
	}

	function insertJsScripts() {
		return pageScripts.js.map((jsFile) => (
			<script type='module' key={jsFile} src={jsFile}></script>
		));
	}

	function insertStyleLinks() {
		return pageScripts.css.map((cssFile) => (
			<link key={cssFile} href={cssFile} rel='stylesheet' />
		));
	}

	const pageTitle = `Opensource Hub | ${title}`;

	return (
		<head>
			<meta charSet='UTF-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			{IS_PROD && getReactSrc()}
			{IS_PROD && insertJsScripts()}
			{insertStyleLinks()}
			<title>{pageTitle}</title>
		</head>
	);
}
