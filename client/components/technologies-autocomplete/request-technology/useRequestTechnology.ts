import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import type { RequestTechnologyInput } from '$/shared/schemas/technologies/request-technology.schema';
import { useMutation } from '@tanstack/react-query';

type Props = {
	onSuccess?: () => void;
};

export function useRequestTechnology({ onSuccess }: Props) {
	const rpcClient = useRpcQueryClient();

	const mutation = useMutation({
		mutationKey: ['request-technology'],
		mutationFn: async (data: RequestTechnologyInput) => {
			return rpcClient.technologies.request.$post({ json: data });
		},
		async onSuccess(response) {
			if (response.ok) {
				onSuccess?.();
			} else {
				const errorText = await response.text();
				throw new Error(errorText);
			}
		},
	});

	return {
		submit: mutation.mutate,
		loading: mutation.isPending,
		error: mutation.error?.message,
	};
}
