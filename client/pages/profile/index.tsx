import { useAuth } from '$/client/providers/auth-provider';
import { ProfileView } from './view';

// TODO: add the tab to the url, so that the user can share the link to a specific tab,
// either with hash or query parameter
export function ProfilePage() {
	const { user } = useAuth();

	return <ProfileView user={user!} />;
}
