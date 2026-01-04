import { useAdminData } from './hook';
import { AdminView } from './view';

export function AdminPage() {
	const { techRequests, users, settings, loading, errors } = useAdminData();

	return (
		<AdminView
			techRequests={techRequests}
			users={users}
			settings={settings}
			loading={loading}
			errors={errors}
		/>
	);
}
