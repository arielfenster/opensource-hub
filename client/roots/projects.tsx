import { hydrateRoot } from 'react-dom/client';
import { Layout } from '../components/layout';
import { getWindow } from '../lib/window';
import { AppProviders } from '../providers/app-providers';
import { ProjectsPage } from '../pages/projects';

import '../index.css';

const dehydratedState = getWindow().__PREFETCHED_STATE__;

hydrateRoot(
	document.getElementById('app')!,
	<AppProviders dehydratedState={dehydratedState}>
		<Layout>
			<ProjectsPage />
		</Layout>
	</AppProviders>,
);
