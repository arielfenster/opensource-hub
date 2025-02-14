import type { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { STATIC_JS_PATH, type AppPage } from '../../shared/constants';
import { IS_PROD, env } from '../../shared/env';
import { Html } from './templates/html';

export type ServerPageProps = {
	title?: string;
	page: AppPage;
	clientData?: Record<string, any>;
};

export function renderServerPage(
	component: ReactNode,
	{ title, page, clientData }: ServerPageProps,
) {
	const pageScript = getPageScript(page);

	return renderToString(
		<Html title={title} pageScript={pageScript} clientData={clientData}>
			{component}
		</Html>,
	);
}

function getPageScript(page: AppPage) {
	if (IS_PROD) {
		return `${env.server.HOST_URL}/${STATIC_JS_PATH}/${page}.js`;
	} else {
		return `client/roots/${page}.tsx`;
	}
}
