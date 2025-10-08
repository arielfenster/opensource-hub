import type { DehydratedState } from '@tanstack/react-query';
import { hydrateRoot } from 'react-dom/client';
import SuperJSON from 'superjson';
import { Layout } from '../components/layout';
import { getWindow } from '../lib/window';
import { ProjectsPage } from '../pages/projects';
import { AppProviders } from '../providers/app-providers';

import '../index.css';

// TODO: move this to the hydratePage function
const dehydratedState = getWindow().__PREFETCHED_STATE__;
const parsedState = dehydratedState
	? (SuperJSON.deserialize(dehydratedState) as DehydratedState)
	: undefined;

hydrateRoot(
	document.getElementById('app')!,
	<AppProviders dehydratedState={parsedState}>
		<Layout>
			<ProjectsPage />
		</Layout>
	</AppProviders>,
);
