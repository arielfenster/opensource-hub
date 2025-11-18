import { getScriptsFromManifest, type PageScripts } from '$/build-utils/manifest';
import { buildEntryInputName, type AppPage } from '$/build-utils/paths';
import { PREFETCHED_USER_QUERY_KEY } from '$/shared/constants';
import { IS_PROD } from '$/shared/env';
import type { Context } from 'hono';
import type { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { usersHandler } from '../../../modules/users/users.handler';
import { ServerPage, type ServerPageProps } from './server-page';

export type RenderServerPageProps = Pick<ServerPageProps, 'title' | 'prefetchedState'> & {
	page: AppPage;
};

export async function renderServerPage(
	c: Context,
	component: ReactNode,
	serverPageProps: RenderServerPageProps,
) {
	let { title, page, prefetchedState } = serverPageProps;
	const user = await usersHandler.getSafeCurrentUser(c);

	if (user) {
		prefetchedState = prefetchedState || [];
		prefetchedState.push({
			key: PREFETCHED_USER_QUERY_KEY,
			data: user,
		});
	}

	const pageScripts = getPageScripts(page);

	return renderToString(
		<ServerPage title={title} pageScripts={pageScripts} prefetchedState={prefetchedState}>
			{component}
		</ServerPage>,
	);
}

function getPageScripts(page: AppPage): PageScripts {
	if (IS_PROD) {
		return getScriptsFromManifest(page);
	} else {
		return {
			js: [buildEntryInputName(page)],
			css: ['/client/index.css'],
		};
	}
}
