import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import type { LoginInput } from '$/shared/schemas/auth/login.schema';
import { useMutation } from '@tanstack/react-query';

export function useLogin() {
	const rpcClient = useRpcQueryClient();

	const mutation = useMutation({
		mutationKey: ['login'],
		mutationFn: async (data: LoginInput) => rpcClient.auth.login.$post({ json: data }),
		async onSuccess(response) {
			if (response.redirected) {
				window.location.href = response.url;
			} else {
				const data = await response.text();
				throw new Error(data);
			}
		},
	});

	return {
		login: mutation.mutate,
		loading: mutation.isPending,
		error: mutation.error?.message,
	};
}
