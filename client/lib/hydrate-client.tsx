import { superjsonDeserialize } from '$/shared/superjson';
import type { DehydratedState } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Layout } from '../components/layout';
import { AppProviders } from '../providers/app-providers';
import { getWindow } from './window';

export function hydratePage(page: ReactNode) {
	const dehydratedState = getWindow().__PREFETCHED_STATE__;
	const parsedState = dehydratedState
		? (superjsonDeserialize(dehydratedState) as DehydratedState)
		: undefined;

	hydrateRoot(
		document.getElementById('app')!,
		<AppProviders dehydratedState={parsedState}>
			<Layout>{page}</Layout>
		</AppProviders>,
	);
}
