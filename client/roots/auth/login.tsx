import { hydrateRoot } from 'react-dom/client';
import { LoginPage } from '../../pages/auth/login';
import { Layout } from '$/client/components/layout';

import '../../index.css';

hydrateRoot(
	document.getElementById('app')!,
	<Layout>
		<LoginPage />
	</Layout>,
);
