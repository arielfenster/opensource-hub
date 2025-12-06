import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import { PREFETCHED_USER_QUERY_KEY } from '$/shared/constants';
import type { UpdatePersonalInfoInput } from '$/shared/schemas/user/update-personal-info.schema';
import type { UserDetails } from '$/shared/types/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePersonalInfo() {
	const rpcClient = useRpcQueryClient();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: ['update-personal-info'],
		mutationFn: async (data: UpdatePersonalInfoInput) =>
			rpcClient.user['update-personal'].$post({ json: data }),
		async onSuccess(response) {
			if (response.ok) {
				const user = (await response.json()) as any as UserDetails;
				queryClient.setQueryData(PREFETCHED_USER_QUERY_KEY, user);
			} else {
				const errorText = await response.text();
				throw new Error(errorText);
			}
		},
	});

	return {
		updatePersonalInfo: mutation.mutate,
		loading: mutation.isPending,
		error: mutation.error?.message,
		success: mutation.isSuccess,
	};
}
