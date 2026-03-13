import { useAdminData } from './hook';
import { AdminView } from './view';

export function AdminPage() {
	const { technologyRequests, users, settings, loading, errors } = useAdminData();

	return (
		<AdminView
			technologyRequests={technologyRequests}
			users={users}
			settings={settings}
			loading={loading}
			errors={errors}
		/>
	);
}
