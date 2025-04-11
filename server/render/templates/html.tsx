import type { PageScripts } from '$/build-utils/manifest';
import { CLIENT_DATA_NAME } from '$/shared/constants';
import { IS_PROD } from '$/shared/env';
import type { PropsWithChildren } from 'react';

export type ServerPageProps = PropsWithChildren<{
	title?: string;
	clientData?: Record<string, any>;
	pageScripts: PageScripts;
}>;

export function Html({ title, pageScripts, clientData, children }: ServerPageProps) {
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

	function injectClientData() {
		if (!clientData) return null;

		return (
			<script
				dangerouslySetInnerHTML={{
					__html: `const ${CLIENT_DATA_NAME} = ${JSON.stringify(clientData)}`,
				}}
			/>
		);
	}

	const pageTitle = `Opensource Hub | ${title}`;

	return (
		<html lang='en'>
			<head>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				{getReactSrc()}
				{IS_PROD && insertJsScripts()}
				{insertStyleLinks()}
				<title>{pageTitle}</title>
			</head>
			<body>
				<div id='app'>{children}</div>
				{injectClientData()}
				{!IS_PROD && <script type='module' src={pageScripts.js[0]}></script>}
			</body>
		</html>
	);
}
