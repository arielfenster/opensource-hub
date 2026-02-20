import type { TechnologyRequest } from '$/shared/types/technology-requests';
import toast from 'react-hot-toast';
import { useTechnologyRequestActions } from './hook';
import { RequestsTable } from './requests-table';

type TechnologyRequestsTabProps = {
	technologyRequests: TechnologyRequest[];
};

export function TechnologyRequestsTab({ technologyRequests }: TechnologyRequestsTabProps) {
	const { approve, decline } = useTechnologyRequestActions({
		onSuccess() {
			toast.success('Technology request updated successfully', {
				style: {
					backgroundColor: '#16A34A',
					color: '#FFFAFF',
					fontWeight: 'bolder',
				},
				duration: 3000,
			});
		},
	});

	return (
		<RequestsTable
			technologyRequests={technologyRequests}
			onApprove={approve.mutate}
			onDecline={decline.mutate}
		/>
	);
}
