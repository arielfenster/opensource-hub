import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import { useQuery } from '@tanstack/react-query';

export function useAdminData() {
	const rpcClient = useRpcQueryClient();

	const techRequestsQuery = useQuery({
		queryKey: ['admin', 'tech-requests'],
		queryFn: () => rpcClient.admin['tech-requests'].$get(),
	});
	const usersQuery = useQuery({
		queryKey: ['admin', 'users'],
		queryFn: () => rpcClient.admin.users.$get(),
	});
	const settingsQuery = useQuery({
		queryKey: ['admin', 'settings'],
		queryFn: () => rpcClient.admin.settings.$get(),
	});

	return {
		techRequests: techRequestsQuery.data,
		users: usersQuery.data,
		settings: settingsQuery.data,
		loading: techRequestsQuery.isPending || usersQuery.isPending || settingsQuery.isPending,
		errors: [techRequestsQuery.error, usersQuery.error, settingsQuery.error],
	};
}
