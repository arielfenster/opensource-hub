import { hydrateRoot } from 'react-dom/client';
import { LoginPage } from '../../pages/auth/login';
import { Layout } from '$/client/components/layout';
import { RpcQueryProvider } from '$/client/providers/rpc-query-provider';
import { AuthProvider } from '$/client/providers/auth-provider';
import { ReactQueryProvider } from '$/client/providers/react-query-provider';

import '../../index.css';

hydrateRoot(
	document.getElementById('app')!,
	<RpcQueryProvider>
		<ReactQueryProvider>
			<AuthProvider>
				<Layout>
					<LoginPage />
				</Layout>
			</AuthProvider>
		</ReactQueryProvider>
	</RpcQueryProvider>,
);
