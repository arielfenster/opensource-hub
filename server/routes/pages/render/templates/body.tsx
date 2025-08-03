import type { PageScripts } from '$/build-utils/manifest';
import { Layout } from '$/client/components/layout';
import { AuthProvider } from '$/client/providers/auth-provider';
import { ReactQueryProvider } from '$/client/providers/react-query-provider';
import { RpcQueryProvider } from '$/client/providers/rpc-query-provider';
import { PREFETCHED_STATE_NAME } from '$/shared/constants';
import { IS_PROD } from '$/shared/env';
import { QueryClient, dehydrate, type DehydratedState, type QueryKey } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export type BodyProps = PropsWithChildren<{
	pageScripts: PageScripts;
	prefetchedState?: {
		key: QueryKey;
		data: Record<string, any>;
	};
}>;

export function Body({ pageScripts, prefetchedState, children }: BodyProps) {
	function createServerQueryContext() {
		if (!prefetchedState) {
			return null;
		}

		const queryClient = new QueryClient();
		queryClient.setQueryData(prefetchedState.key, prefetchedState.data);
		const dehydratedState = dehydrate(queryClient);

		return {
			queryClient,
			dehydratedState,
		};
	}

	function injectPrefetchedState(dehydratedState?: DehydratedState) {
		if (!dehydratedState) {
			return null;
		}

		return (
			<script
				dangerouslySetInnerHTML={{
					__html: `${PREFETCHED_STATE_NAME} = ${JSON.stringify(dehydratedState)};`,
				}}
			/>
		);
	}

	const serverQueryContext = createServerQueryContext();

	return (
		<body>
			<div id='app'>
				<RpcQueryProvider>
					<ReactQueryProvider client={serverQueryContext?.queryClient}>
						<AuthProvider>
							<Layout>{children}</Layout>
						</AuthProvider>
					</ReactQueryProvider>
				</RpcQueryProvider>
			</div>
			{injectPrefetchedState(serverQueryContext?.dehydratedState)}
			{!IS_PROD && <script type='module' src={pageScripts.js[0]}></script>}
		</body>
	);
}
