import { useAuth } from '$/client/providers/auth-provider';
import { ProfileTabs } from './profile-tabs';

// TODO: add the tab to the url, so that the user can share the link to a specific tab,
// either with hash or query parameter
export function ProfilePage() {
	const { user } = useAuth();

	return (
		<div className='flex flex-col gap-8 px-4 py-8'>
			<h1 className='text-royal-blue text-4xl font-semibold'>Profile Settings</h1>
			<div className='flex gap-8'>
				<ProfileTabs user={user!} />
			</div>
		</div>
	);
}
