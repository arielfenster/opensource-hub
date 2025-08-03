import { hydrateRoot } from 'react-dom/client';
import { Layout } from '../components/layout';
import { getWindow } from '../lib/window';
import { ProfilePage } from '../pages/profile';
import { AuthProvider } from '../providers/auth-provider';
import { ReactQueryProvider } from '../providers/react-query-provider';
import { RpcQueryProvider } from '../providers/rpc-query-provider';

import '../index.css';

const dehydratedState = getWindow().__PREFETCHED_STATE__;

hydrateRoot(
	document.getElementById('app')!,
	<RpcQueryProvider>
		<ReactQueryProvider dehydratedState={dehydratedState}>
			<AuthProvider>
				<Layout>
					<ProfilePage />
				</Layout>
			</AuthProvider>
		</ReactQueryProvider>
	</RpcQueryProvider>,
);
