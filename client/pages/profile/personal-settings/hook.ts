import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import type { UpdatePersonalInfoInput } from '$/shared/schemas/user/update-personal-info.schema';
import { useMutation } from '@tanstack/react-query';

export function usePersonalSettings() {
	const rpcClient = useRpcQueryClient();

	const mutation = useMutation({
		mutationKey: ['update-personal-settings'],
		mutationFn: async (data: UpdatePersonalInfoInput) =>
			rpcClient.user['update-personal'].$post({ json: data }),
		async onSuccess(response) {
			if (response.ok) {
				alert('cool, personal settings updated');
			} else {
				const errorText = await response.text();
				throw new Error(errorText);
			}
		},
	});

	return {
		updatePersonalSettings: mutation.mutate,
		loading: mutation.isPending,
		error: mutation.error?.message,
		success: mutation.isSuccess,
	};
}
