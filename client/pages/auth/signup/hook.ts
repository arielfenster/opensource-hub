import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import type { SignupInput } from '$/shared/schemas/auth/signup.schema';
import { useMutation } from '@tanstack/react-query';

export function useSignup() {
	const rpcClient = useRpcQueryClient();

	const mutation = useMutation({
		mutationKey: ['signup'],
		mutationFn: async (data: SignupInput) => rpcClient.auth.signup.$post({ json: data }),
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
		signup: mutation.mutate,
		loading: mutation.isPending,
		error: mutation.error?.message,
	};
}
