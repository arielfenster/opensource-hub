import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import type { UserWithSocialLinks } from '$/server/modules/users/types';
import type { UpdatePersonalInfoInput } from '$/shared/schemas/user/update-personal-info.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePersonalSettings() {
	const rpcClient = useRpcQueryClient();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: ['update-personal-settings'],
		mutationFn: async (data: UpdatePersonalInfoInput) =>
			rpcClient.user['update-personal'].$post({ json: data }),
		async onSuccess(response) {
			if (response.ok) {
				const user = (await response.json()) as any as UserWithSocialLinks;
				queryClient.setQueryData(['user'], user);
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
