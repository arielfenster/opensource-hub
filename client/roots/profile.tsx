import { hydrateRoot } from 'react-dom/client';
import { Layout } from '../components/layout';
import { getWindow } from '../lib/window';
import { ProfilePage } from '../pages/profile';
import { AppProviders } from '../providers/app-providers';

import '../index.css';

const dehydratedState = getWindow().__PREFETCHED_STATE__;

hydrateRoot(
	document.getElementById('app')!,
	<AppProviders dehydratedState={dehydratedState}>
		<Layout>
			<ProfilePage />
		</Layout>
	</AppProviders>,
);
