import { hydrateRoot } from 'react-dom/client';
import { Layout } from '../components/layout';
import { getWindow } from '../lib/window';
import { HomePage } from '../pages/home';
import { AppProviders } from '../providers/app-providers';

import '../index.css';

const dehydratedState = getWindow().__PREFETCHED_STATE__;

hydrateRoot(
	document.getElementById('app')!,
	<AppProviders dehydratedState={dehydratedState}>
		<Layout>
			<HomePage />
		</Layout>
	</AppProviders>,
);
