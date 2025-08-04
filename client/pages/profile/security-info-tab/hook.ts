import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import type { UpdateSecurityInfoInput } from '$/shared/schemas/user/update-security-info.schema';
import type { AuthenticatedUser } from '$/shared/types/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSecurityInfo() {
	const rpcClient = useRpcQueryClient();
	// const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: ['update-security-info'],
		mutationFn: (data: UpdateSecurityInfoInput) =>
			rpcClient.user['update-security'].$post({ json: data }),
		async onSuccess(response) {
			if (response.ok) {
				const user = (await response.json()) as any as AuthenticatedUser;
				console.log({ user });
			} else {
				const errorText = await response.text();
				throw new Error(errorText);
			}
		},
	});

	return {
		updateSecurityInfo: mutation.mutate,
		loading: mutation.isPending,
		error: mutation.error?.message,
		success: mutation.isSuccess,
	};
}
