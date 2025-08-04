import { Layout } from '$/client/components/layout';
import { AppProviders } from '$/client/providers/app-providers';
import { hydrateRoot } from 'react-dom/client';
import { LoginPage } from '../../pages/auth/login';

import '../../index.css';

hydrateRoot(
	document.getElementById('app')!,
	<AppProviders>
		<Layout>
			<LoginPage />
		</Layout>
	</AppProviders>
);
