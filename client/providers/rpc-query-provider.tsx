import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { hc } from 'hono/client';
import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import type { ApiRoutes } from '$/server/app';

type RpcQueryProviderValue = ReturnType<typeof hc<ApiRoutes>> | null;

const RpcQueryContext = createContext<RpcQueryProviderValue>(null);

export function RpcQueryProvider({ children }: PropsWithChildren) {
	const [rpcClient] = useState(() => hc<ApiRoutes>(`${import.meta.env.VITE_HOST_URL}/api`));
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
			<RpcQueryContext.Provider value={rpcClient}>{children}</RpcQueryContext.Provider>
		</QueryClientProvider>
	);
}

export function useRpcQueryClient() {
	const client = useContext(RpcQueryContext);
	if (!client) {
		throw new Error('useRpcQueryClient must be used within a RpcQueryProvider');
	}
	return client;
}
