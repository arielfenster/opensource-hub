import type { PageScripts } from '$/build-utils/manifest';
import { Layout } from '$/client/components/layout';
import { ReactQueryProvider } from '$/client/providers/react-query-provider';
import { RpcQueryProvider } from '$/client/providers/rpc-query-provider';
import { PREFETCHED_STATE_NAME } from '$/shared/constants';
import { IS_PROD } from '$/shared/env';
import { QueryClient, dehydrate, type QueryKey } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export type ServerPageProps = PropsWithChildren<{
	title?: string;
	clientData?: Record<string, any>;
	pageScripts: PageScripts;
	prefetchedState?: {
		key: QueryKey;
		data: Record<string, any>;
	};
}>;

export function Html({
	title,
	pageScripts,
	clientData,
	prefetchedState,
	children,
}: ServerPageProps) {
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

	// function injectClientData() {
	// 	if (!clientData) {
	// 		return null;
	// 	}

	// 	return (
	// 		<script
	// 			dangerouslySetInnerHTML={{
	// 				__html: `${CLIENT_DATA_NAME} = ${JSON.stringify(clientData)};`,
	// 			}}
	// 		/>
	// 	);
	// }

	function injectPrefetchedState() {
		if (!prefetchedState) {
			return null;
		}

		const queryClient = new QueryClient();
		queryClient.setQueryData(prefetchedState.key, prefetchedState.data);
		const dehydratedState = dehydrate(queryClient);

		return (
			<script
				dangerouslySetInnerHTML={{
					__html: `${PREFETCHED_STATE_NAME} = ${JSON.stringify(dehydratedState)};`,
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
				<div id='app'>
					<RpcQueryProvider>
						<ReactQueryProvider>
							<Layout user={clientData?.user}>{children}</Layout>
						</ReactQueryProvider>
					</RpcQueryProvider>
				</div>
				{/* {injectClientData()} */}
				{injectPrefetchedState()}
				{!IS_PROD && <script type='module' src={pageScripts.js[0]}></script>}
			</body>
		</html>
	);
}
