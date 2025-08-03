import type { PageScripts } from '$/build-utils/manifest';
import { IS_PROD } from '$/shared/env';

export type HeadProps = {
	title?: string;
	pageScripts: PageScripts;
};

export function Head({ title, pageScripts }: HeadProps) {
	function getReactSrc() {
		return (
			<>
				<script
					crossOrigin=''
					src='https://unpkg.com/react@18.2.0/umd/react.production.min.js'
				></script>
				<script
					crossOrigin=''
					src='https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js'
				></script>
			</>
		);
	}

	function insertJsScripts() {
		return pageScripts.js.map((jsFile) => <script key={jsFile} src={jsFile}></script>);
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
			{getReactSrc()}
			{IS_PROD && insertJsScripts()}
			{insertStyleLinks()}
			<title>{pageTitle}</title>
		</head>
	);
}
