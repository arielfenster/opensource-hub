import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import type { UpdateSecurityInfoInput } from '$/shared/schemas/user/update-security-info.schema';
import { useMutation } from '@tanstack/react-query';

export function useSecurityInfo() {
	const rpcClient = useRpcQueryClient();

	const mutation = useMutation({
		mutationKey: ['update-security-info'],
		mutationFn: (data: UpdateSecurityInfoInput) =>
			rpcClient.user['update-security'].$post({ json: data }),
		async onSuccess(response) {
			if (!response.ok) {
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
