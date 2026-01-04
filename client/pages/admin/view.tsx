import { AdminTabs } from './admin-tabs';

type AdminViewProps = {
	techRequests: any;
	users: any;
	settings: any;
	loading: boolean;
	errors: (Error | null)[];
};

export function AdminView({ techRequests, users, settings, loading, errors }: AdminViewProps) {
	return (
		<div className='flex flex-col gap-8 px-4 py-8'>
			<h1 className='page_title'>Admin Dashboard</h1>
			<div className='flex gap-8'>
				<AdminTabs techRequests={techRequests} users={users} settings={settings} />
			</div>
		</div>
	);
}
