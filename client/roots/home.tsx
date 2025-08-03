import { hydrateRoot } from 'react-dom/client';
import { HomePage } from '../pages/home';
import { getWindow } from '../lib/window';
import { Layout } from '../components/layout';
import { RpcQueryProvider } from '../providers/rpc-query-provider';
import { ReactQueryProvider } from '../providers/react-query-provider';
import { AuthProvider } from '../providers/auth-provider';

import '../index.css';

const dehydratedState = getWindow().__PREFETCHED_STATE__;

hydrateRoot(
	document.getElementById('app')!,
	<RpcQueryProvider>
		<ReactQueryProvider dehydratedState={dehydratedState}>
			<AuthProvider>
				<Layout>
					<HomePage />
				</Layout>
			</AuthProvider>
		</ReactQueryProvider>
	</RpcQueryProvider>,
);
