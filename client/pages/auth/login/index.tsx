import { RpcQueryProvider } from '$/client/providers/rpc-query-provider';
import { LoginContainer } from './container';

export function LoginPage() {
	return (
		<RpcQueryProvider>
			<LoginContainer />
		</RpcQueryProvider>
	);
}
