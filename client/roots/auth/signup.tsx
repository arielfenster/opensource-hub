import { Layout } from '$/client/components/layout';
import { hydrateRoot } from 'react-dom/client';
import { SignupPage } from '../../pages/auth/signup';
import { AuthProvider } from '$/client/providers/auth-provider';
import { ReactQueryProvider } from '$/client/providers/react-query-provider';
import { RpcQueryProvider } from '$/client/providers/rpc-query-provider';

hydrateRoot(
	document.getElementById('app')!,
	<RpcQueryProvider>
		<ReactQueryProvider>
			<AuthProvider>
				<Layout>
					<SignupPage />
				</Layout>
			</AuthProvider>
		</ReactQueryProvider>
	</RpcQueryProvider>,
);
