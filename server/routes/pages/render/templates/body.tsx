import type { PageScripts } from '$/build-utils/manifest';
import { Layout } from '$/client/components/layout';
import { AppProviders } from '$/client/providers/app-providers';
import { PREFETCHED_STATE_NAME } from '$/shared/constants';
import { IS_PROD } from '$/shared/env';
import { superjsonStringify } from '$/shared/superjson';
import { QueryClient, dehydrate, type DehydratedState, type QueryKey } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

export type BodyProps = PropsWithChildren<{
	pageScripts: PageScripts;
	prefetchedState?: {
		key: QueryKey;
		data: any;
	}[];
}>;

export function Body({ pageScripts, prefetchedState, children }: BodyProps) {
	function createServerQueryContext() {
		if (!prefetchedState) {
			return null;
		}

		const queryClient = new QueryClient();
		prefetchedState?.forEach(({ key, data }) => {
			queryClient.setQueryData(key, data);
		});
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
					__html: `${PREFETCHED_STATE_NAME} = ${superjsonStringify(dehydratedState)};`,
				}}
			/>
		);
	}

	const serverQueryContext = createServerQueryContext();

	return (
		<body>
			<div id='app'>
				<AppProviders client={serverQueryContext?.queryClient}>
					<Layout>{children}</Layout>
				</AppProviders>
			</div>
			{injectPrefetchedState(serverQueryContext?.dehydratedState)}
			{!IS_PROD && <script type='module' src={`/${pageScripts.js[0]}`}></script>}
		</body>
	);
}
