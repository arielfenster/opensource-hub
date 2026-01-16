import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import { useQuery } from '@tanstack/react-query';

export function useAdminData() {
	const rpcClient = useRpcQueryClient();

	const techRequestsQuery = useQuery({
		queryKey: ['admin', 'tech-requests'],
		queryFn: async () => (await rpcClient.admin['tech-requests'].$get()).json(),
		initialData: [],
	});
	const usersQuery = useQuery({
		queryKey: ['admin', 'users'],
		queryFn: async () => (await rpcClient.admin.users.$get()).json(),
	});
	const settingsQuery = useQuery({
		queryKey: ['admin', 'settings'],
		queryFn: async () => (await rpcClient.admin.settings.$get()).json(),
	});

	return {
		techRequests: techRequestsQuery.data,
		users: usersQuery.data,
		settings: settingsQuery.data,
		loading: techRequestsQuery.isPending || usersQuery.isPending || settingsQuery.isPending,
		errors: [techRequestsQuery.error, usersQuery.error, settingsQuery.error],
	};
}
