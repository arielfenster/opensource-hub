import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
	type DehydratedState,
} from '@tanstack/react-query';
import { useState, type PropsWithChildren } from 'react';
import { isServerSide } from '../lib/window';

type Props = PropsWithChildren<{
	dehydratedState?: DehydratedState;
}>;

export function ReactQueryProvider({ dehydratedState, children }: Props) {
	const [queryClient] = useState(
		() =>
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
