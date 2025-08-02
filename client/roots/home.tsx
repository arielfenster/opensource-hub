import { hydrateRoot } from 'react-dom/client';
import { HomePage } from '../pages/home';
import { getPropertyFromClientData, getWindow } from '../lib/window';
import type { AuthenticatedUser } from '$/shared/types/users';
import { Layout } from '../components/layout';
import { RpcQueryProvider } from '../providers/rpc-query-provider';
import { ReactQueryProvider } from '../providers/react-query-provider';

import '../index.css';

const user = getPropertyFromClientData<AuthenticatedUser>('user');
const dehydratedState = getWindow().__PREFETCHED_STATE__;

hydrateRoot(
	document.getElementById('app')!,
	<RpcQueryProvider>
		<ReactQueryProvider dehydratedState={dehydratedState}>
			<Layout user={user}>
				<HomePage />
			</Layout>
		</ReactQueryProvider>
	</RpcQueryProvider>,
);
