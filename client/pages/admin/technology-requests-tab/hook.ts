import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
	onSuccess?: () => void;
};

export function useTechnologyRequestActions({ onSuccess }: Props = {}) {
	const rpcClient = useRpcQueryClient();
	const queryClient = useQueryClient();

	const approve = useMutation({
		mutationKey: ['admin', 'technology-requests', 'approve'],
		mutationFn: async (id: string) => {
			return rpcClient.admin['technology-requests'][':id'].$patch({
				param: { id },
				json: { status: 'approved' },
			});
		},
		async onSuccess(response) {
			if (response.ok) {
				queryClient.refetchQueries({ queryKey: ['admin', 'technology-requests'] });
				onSuccess?.();
			} else {
				const errorText = await response.text();
				throw new Error(errorText);
			}
		},
	});

	const decline = useMutation({
		mutationKey: ['admin', 'technology-requests', 'decline'],
		mutationFn: async (id: string) => {
			return rpcClient.admin['technology-requests'][':id'].$patch({
				param: { id },
				json: { status: 'declined' },
			});
		},
		async onSuccess(response) {
			if (response.ok) {
				queryClient.refetchQueries({ queryKey: ['admin', 'technology-requests'] });
				onSuccess?.();
			} else {
				const errorText = await response.text();
				throw new Error(errorText);
			}
		},
	});

	return {
		approve,
		decline,
	};
}
