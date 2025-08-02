import type { AuthenticatedUser } from '$/shared/types/users';
import { hydrateRoot } from 'react-dom/client';
import { Layout } from '../components/layout';
import { getPropertyFromClientData } from '../lib/window';
import { ProfilePage } from '../pages/profile';

import '../index.css';

const user = getPropertyFromClientData<AuthenticatedUser>('user');

hydrateRoot(
	document.getElementById('app')!,
	<Layout user={user}>
		<ProfilePage />
	</Layout>,
);
