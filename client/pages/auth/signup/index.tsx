import { RpcQueryProvider } from '../../../providers/rpc-query-provider';
import { SignupContainer } from './container';

export function SignupPage() {
	return (
		<RpcQueryProvider>
			<SignupContainer />
		</RpcQueryProvider>
	);
}
