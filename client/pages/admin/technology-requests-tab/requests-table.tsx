import { Button } from '$/client/components/ui/button';
import { Table } from '$/client/components/ui/table';
import { TechnologyGroupLabel } from '$/client/components/ui/technology-group-label';
import { parseDate } from '$/client/lib/utils';
import type { TechnologyRequest } from '$/shared/types/technology-requests';
import { XIcon } from 'lucide-react';
import { CheckmarkIcon } from 'react-hot-toast';

type RequestsTableProps = {
	technologyRequests: TechnologyRequest[];
	onApprove: (id: string) => void;
	onDecline: (id: string) => void;
};

export function RequestsTable({ technologyRequests, onApprove, onDecline }: RequestsTableProps) {
	return (
		<Table>
			<Table.Header>
				<Table.Head>Name</Table.Head>
				<Table.Head>Group</Table.Head>
				<Table.Head>Requester</Table.Head>
				<Table.Head>Submitted</Table.Head>
				<Table.Head>Actions</Table.Head>
			</Table.Header>
			<Table.Body>
				{technologyRequests.map((request) => (
					<Table.Row key={request.id}>
						<Table.Cell>{request.name}</Table.Cell>
						<Table.Cell>
							<TechnologyGroupLabel technologyGroupName={request.group.name} />
						</Table.Cell>
						<Table.Cell>{request.requestedBy}</Table.Cell>
						<Table.Cell>{parseDate(request.createdAt)}</Table.Cell>
						<Table.Cell>
							<TableActions
								request={request}
								onApprove={onApprove}
								onDecline={onDecline}
							/>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

type TableActionsProps = {
	request: TechnologyRequest;
	onApprove: (id: string) => void;
	onDecline: (id: string) => void;
};
function TableActions({ request, onApprove, onDecline }: TableActionsProps) {
	return (
		<div className='flex'>
			<Button className='bg-gray-600 hover:bg-gray-500' onClick={() => onApprove(request.id)}>
				<CheckmarkIcon className='text-ghost-white' />
				<span>Approve</span>
			</Button>
			<Button className='bg-gray-600 hover:bg-gray-500' onClick={() => onDecline(request.id)}>
				<XIcon className='text-red-500' />
				<span>Decline</span>
			</Button>
		</div>
	);
}
