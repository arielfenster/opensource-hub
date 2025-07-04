import { useAuth } from '$/client/providers/auth-provider';

export function ProfilePage() {
	const user = useAuth().user!;

	return <div>{JSON.stringify(user)}</div>;
}
