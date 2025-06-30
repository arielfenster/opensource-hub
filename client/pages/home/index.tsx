import { Layout } from '$/client/components/layout';
import type { AuthProviderProps } from '$/client/providers/auth-provider';
import { RpcQueryProvider } from '$/client/providers/rpc-query-provider';
import type { AuthenticatedUser } from '$/shared/types/users';
import { HomeContainer } from './container';

type ClientPageProps = {
	user?: AuthenticatedUser;
};

export function HomePage({ user }: Pick<AuthProviderProps, 'user'>) {
	return (
		<Layout user={user}>
			<RpcQueryProvider>
				<HomeContainer />
			</RpcQueryProvider>
		</Layout>
	);
}
