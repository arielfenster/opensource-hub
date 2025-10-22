import { useRpcQueryClient } from '$/client/providers/rpc-query-provider';
import type { CreateProjectInput } from '$/shared/schemas/project/create-project.schema';
import { useMutation } from '@tanstack/react-query';

export function useCreateProject() {
	const rpcClient = useRpcQueryClient();

	const mutation = useMutation({
		mutationKey: ['create-project'],
		mutationFn: async (data: CreateProjectInput) =>
			rpcClient.projects.create.$post({ json: data }),
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
		createProject: mutation.mutate,
		loading: mutation.isPending,
		error: mutation.error?.message,
	};
}
