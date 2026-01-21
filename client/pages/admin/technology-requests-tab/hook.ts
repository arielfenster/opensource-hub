import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import type { TechnologyRequest } from '$/shared/types/technology-requests';
import { useMutation } from '@tanstack/react-query';

type Props = {
	technologyRequest: TechnologyRequest;
	onSuccess: () => void;
};

export function useTechnologyRequestActions({ technologyRequest, onSuccess }: Props) {
	const rpcClient = useRpcQueryClient();

	const approve = useMutation({
		mutationKey: ['admin', 'technology-requests', technologyRequest.id, 'approve'],
		mutationFn: async () => {
			return rpcClient.admin['technology-requests'][':id'].$patch({
				param: { id: technologyRequest.id },
				json: { status: 'approved' },
			});
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

	const decline = useMutation({
		mutationKey: ['admin', 'technology-requests', technologyRequest.id, 'decline'],
		mutationFn: async () => {
			return rpcClient.admin['technology-requests'][':id'].$patch({
				param: { id: technologyRequest.id },
				json: { status: 'declined' },
			});
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
		approve,
		decline,
	};
}
