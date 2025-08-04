import { Layout } from '$/client/components/layout';
import { AppProviders } from '$/client/providers/app-providers';
import { hydrateRoot } from 'react-dom/client';
import { SignupPage } from '../../pages/auth/signup';

hydrateRoot(
	document.getElementById('app')!,
	<AppProviders>
		<Layout>
			<SignupPage />
		</Layout>
	</AppProviders>,
);
