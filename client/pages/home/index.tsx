import { RpcQueryProvider } from '$/client/providers/rpc-query-provider';
import { HomeContainer } from './container';

export function HomePage() {
	return (
		<RpcQueryProvider>
			<HomeContainer />
		</RpcQueryProvider>
	);
}
