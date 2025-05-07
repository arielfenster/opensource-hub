import { Layout } from '$/client/components/layout';
import { RpcQueryProvider } from '$/client/providers/rpc-query-provider';
import { LoginContainer } from './container';

export function LoginPage() {
	return (
		<Layout>
			<RpcQueryProvider>
				<LoginContainer />
			</RpcQueryProvider>
		</Layout>
	);
}
