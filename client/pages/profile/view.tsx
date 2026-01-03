import type { UserDetails } from '$/shared/types/users';
import { ProfileTabs } from './profile-tabs';

type ProfileViewProps = {
	user: UserDetails;
};

export function ProfileView({ user }: ProfileViewProps) {
	return (
		<div className='flex flex-col gap-8 px-4 py-8'>
			<h1 className='page_title'>Profile Settings</h1>
			<div className='flex gap-8'>
				<ProfileTabs user={user!} />
			</div>
		</div>
	);
}
