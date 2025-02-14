import type { PropsWithChildren } from 'react';
import type { ServerPageProps } from '..';
import { CLIENT_DATA_NAME, STATIC_CSS_FILE_PATH } from '../../../shared/constants';

type Props = PropsWithChildren<
	Pick<ServerPageProps, 'title' | 'clientData'> & { pageScript: string }
>;

export function Html({ title, pageScript, clientData, children }: Props) {
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

	function getStylesLink() {
		return <link href={`/${STATIC_CSS_FILE_PATH}`} rel='stylesheet' />;
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
				{getStylesLink()}
				<title>{pageTitle}</title>
			</head>
			<body>
				<div id='app'>{children}</div>
				{injectClientData()}
				<script type='module' src={pageScript}></script>
			</body>
		</html>
	);
}
