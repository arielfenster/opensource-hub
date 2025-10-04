import { PREFETCHED_PROJECT_DETAILS_QUERY_KEY } from '$/shared/constants';
import { useQueryClient } from '@tanstack/react-query';

type Props = {};

export function ProjectDetailsPage({}: Props) {
	const client = useQueryClient();
	const data = client.getQueryData(PREFETCHED_PROJECT_DETAILS_QUERY_KEY);
	console.log(data);
	return <div>Hello from ProjectDetailsPage</div>;
}
