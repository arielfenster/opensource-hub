import { Table } from '$/client/components/ui/table';
import { TechnologyGroupLabel } from '$/client/components/ui/technology-group-label';
import { parseDate } from '$/client/lib/utils';
import type { TechnologyRequest } from '$/shared/types/technology-requests';

type TechRequestsTabProps = {
	techRequests: TechnologyRequest[];
};

export function TechRequestsTab({ techRequests }: TechRequestsTabProps) {
	return (
		<Table>
			<Table.Header>
				<Table.Head>Name</Table.Head>
				<Table.Head>Group</Table.Head>
				<Table.Head>Requester</Table.Head>
				<Table.Head>Submitted</Table.Head>
			</Table.Header>
			<Table.Body>
				{techRequests.map((request) => (
					<Table.Row key={request.id}>
						<Table.Cell>{request.name}</Table.Cell>
						<Table.Cell>
							<TechnologyGroupLabel
								technology={{
									id: '',
									name: request.name,
									group: { name: request.group, id: '' },
								}}
							/>
						</Table.Cell>
						<Table.Cell>{request.requestedBy}</Table.Cell>
						<Table.Cell>{parseDate(request.createdAt)}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}
