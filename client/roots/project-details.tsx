import { superjsonDeserialize } from '$/shared/superjson';
import { hydrateRoot } from 'react-dom/client';
import { Layout } from '../components/layout';
import { getWindow } from '../lib/window';
import { ProjectDetailsPage } from '../pages/project-details';
import { AppProviders } from '../providers/app-providers';

import '../index.css';

// TODO: move this to the hydratePage function
const dehydratedState = getWindow().__PREFETCHED_STATE__;
const parsedState = superjsonDeserialize(dehydratedState);

hydrateRoot(
	document.getElementById('app')!,
	<AppProviders dehydratedState={parsedState}>
		<Layout>
			<ProjectDetailsPage />
		</Layout>
	</AppProviders>,
);
