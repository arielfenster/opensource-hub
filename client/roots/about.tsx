import { hydrateRoot } from 'react-dom/client';
import { Layout } from '../components/layout';
import { getPropertyFromClientData } from '../lib/window';
import { AboutPage } from '../pages/about';
import { type AuthenticatedUser } from '$/shared/types/users';

import '../index.css';

const user = getPropertyFromClientData<AuthenticatedUser>('user');

hydrateRoot(
	document.getElementById('app')!,
	<Layout user={user}>
		<AboutPage />
	</Layout>,
);
