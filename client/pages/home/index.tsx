import { Layout } from '$/client/components/layout';
import { RpcQueryProvider } from '$/client/providers/rpc-query-provider';
import { HomeContainer } from './container';

export function HomePage() {
	return (
		<Layout>
			<RpcQueryProvider>
				<HomeContainer />
			</RpcQueryProvider>
		</Layout>
	);
}
