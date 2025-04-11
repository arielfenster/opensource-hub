import type { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { getScriptsFromManifest, type PageScripts } from '../../build-utils/manifest';
import { buildEntryInputName, type AppPage } from '../../build-utils/paths';
import { IS_PROD } from '../../shared/env';
import { Html, type ServerPageProps } from './templates/html';

type Props = Pick<ServerPageProps, 'title' | 'clientData'> & { page: AppPage };

export function renderServerPage(component: ReactNode, { title, page, clientData }: Props) {
	const pageScripts = getPageScripts(page);

	return renderToString(
		<Html title={title} pageScripts={pageScripts} clientData={clientData}>
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
