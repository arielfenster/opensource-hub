import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import { useQuery } from '@tanstack/react-query';

export function AdminPage() {
	const rpcClient = useRpcQueryClient();
	const { data: techRequests } = useQuery({
		queryKey: ['admin', 'tech-requests'],
		queryFn: () => rpcClient.admin['tech-requests'].$get(),
	});
	const { data: users } = useQuery({
		queryKey: ['admin', 'users'],
		queryFn: () => rpcClient.admin.users.$get(),
	});
	const { data: settings } = useQuery({
		queryKey: ['admin', 'settings'],
		queryFn: () => rpcClient.admin.settings.$get(),
	});

	return (
		<div>
			<h1>Hello from AdminPage</h1>
			<span>{JSON.stringify({ techRequests, users, settings })}</span>
		</div>
	);
}
