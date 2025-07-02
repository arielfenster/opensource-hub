import { Layout } from '$/client/components/layout';
import { hydrateRoot } from 'react-dom/client';
import { SignupPage } from '../../pages/auth/signup';

hydrateRoot(
	document.getElementById('app')!,
	<Layout>
		<SignupPage />
	</Layout>,
);
