import { Layout } from '$/client/components/layout';
import { RpcQueryProvider } from '../../../providers/rpc-query-provider';
import { SignupContainer } from './container';

export function SignupPage() {
	return (
		<Layout>
			<RpcQueryProvider>
				<SignupContainer />
			</RpcQueryProvider>
		</Layout>
	);
}
