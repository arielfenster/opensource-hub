import { hydrateRoot } from 'react-dom/client';
import { HomePage } from '../pages/home';
import { getPropertyFromClientData } from '../lib/window';
import type { AuthenticatedUser } from '$/shared/types/users';
import { Layout } from '../components/layout';

import '../index.css';

const user = getPropertyFromClientData<AuthenticatedUser>('user');

hydrateRoot(
	document.getElementById('app')!,
	<Layout user={user}>
		<HomePage />
	</Layout>,
);
