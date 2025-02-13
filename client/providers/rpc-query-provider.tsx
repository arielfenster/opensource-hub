import { hc } from 'hono/client';
import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import type { ApiRoutes } from '../../server/app';
import { env } from '../../shared/env';

type RpcQueryProviderValue = ReturnType<typeof hc<ApiRoutes>> | null;

const RpcQueryContext = createContext<RpcQueryProviderValue>(null);

export function RpcQueryProvider({ children }: PropsWithChildren) {
	const [client] = useState(() => hc<ApiRoutes>(env.server.HOST_URL));

	return <RpcQueryContext.Provider value={client}>{children}</RpcQueryContext.Provider>;
}

export function useRpcQueryClient() {
	const client = useContext(RpcQueryContext);
	if (!client) {
		throw new Error('useRpcQueryClient must be used within a RpcQueryProvider');
	}
	return client;
}
