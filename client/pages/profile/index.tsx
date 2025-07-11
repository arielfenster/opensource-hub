import { RpcQueryProvider } from '$/client/providers/rpc-query-provider';
import { ProfileContainer } from './container';

export function ProfilePage() {
	return (
		<RpcQueryProvider>
			<ProfileContainer />
		</RpcQueryProvider>
	);
}
