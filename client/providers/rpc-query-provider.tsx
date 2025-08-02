import { hc } from 'hono/client';
import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import type { ApiRoutes } from '$/server/app';

const RpcQueryContext = createContext<ReturnType<typeof hc<ApiRoutes>> | null>(null);

export function RpcQueryProvider({ children }: PropsWithChildren) {
	const [rpcClient] = useState(() => hc<ApiRoutes>(`${import.meta.env.VITE_HOST_URL}/api`));

	return <RpcQueryContext.Provider value={rpcClient}>{children}</RpcQueryContext.Provider>;
}

export function useRpcQueryClient() {
	const client = useContext(RpcQueryContext);
	if (!client) {
		throw new Error('useRpcQueryClient must be used within a RpcQueryProvider');
	}
	return client;
}
