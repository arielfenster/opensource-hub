import type { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './auth-provider';
import { ReactQueryProvider, type ReactQueryProviderProps } from './react-query-provider';
import { RpcQueryProvider } from './rpc-query-provider';

type Props = PropsWithChildren<ReactQueryProviderProps & {}>;

export function AppProviders({ client, dehydratedState, children }: Props) {
	return (
		<RpcQueryProvider>
			<ReactQueryProvider client={client} dehydratedState={dehydratedState}>
				<AuthProvider>
					{children}
					<Toaster />
				</AuthProvider>
			</ReactQueryProvider>
		</RpcQueryProvider>
	);
}
