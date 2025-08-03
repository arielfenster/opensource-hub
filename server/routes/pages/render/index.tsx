import type { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { getScriptsFromManifest, type PageScripts } from '../../../../build-utils/manifest';
import { buildEntryInputName, type AppPage } from '../../../../build-utils/paths';
import { IS_PROD } from '../../../../shared/env';
import { Html, type ServerPageProps } from './templates/html';
import type { Context } from 'hono';
import { usersHandler } from '../../../modules/users/users.handler';

export type RenderServerPageProps = Pick<ServerPageProps, 'title' | 'prefetchedState'> & {
	page: AppPage;
};

export function renderServerPage(component: ReactNode, serverPageProps: RenderServerPageProps) {
	const { title, page, prefetchedState } = serverPageProps;

	const pageScripts = getPageScripts(page);

	return renderToString(
		<Html title={title} pageScripts={pageScripts} prefetchedState={prefetchedState}>
			{component}
		</Html>,
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

export async function renderServerPageWithUser(
	c: Context,
	...args: Parameters<typeof renderServerPage>
) {
	const [component, serverPageProps] = args;
	const user = await usersHandler.getCurrentUser(c);

	if (user) {
		serverPageProps.prefetchedState = {
			key: ['user'],
			data: user,
		};
	}

	return renderServerPage(component, serverPageProps);
}
