import type { PropsWithChildren } from 'react';
import { ReactQueryProvider, type ReactQueryProviderProps } from './react-query-provider';
import { RpcQueryProvider } from './rpc-query-provider';
import { AuthProvider } from './auth-provider';

type Props = PropsWithChildren<ReactQueryProviderProps & {}>;

export function AppProviders({ client, dehydratedState, children }: Props) {
	return (
		<RpcQueryProvider>
			<ReactQueryProvider client={client} dehydratedState={dehydratedState}>
				<AuthProvider>{children}</AuthProvider>
			</ReactQueryProvider>
		</RpcQueryProvider>
	);
}
