import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
	type DehydratedState,
} from '@tanstack/react-query';
import { useState, type PropsWithChildren } from 'react';
import { isServerSide } from '../lib/window';

export type ReactQueryProviderProps = PropsWithChildren<{
	client?: QueryClient;
	dehydratedState?: DehydratedState;
}>;

export function ReactQueryProvider({ client, dehydratedState, children }: ReactQueryProviderProps) {
	const [queryClient] = useState(
		client ??
			new QueryClient({
				// defaultOptions: {
				// 	hydrate: {
				// 		queries: {
				// 		}
				// 	}
				// }
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			{isServerSide() ? (
				children
			) : (
				<HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
			)}
		</QueryClientProvider>
	);
}
