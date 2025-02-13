import type { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { Html } from './templates/html';

export type ServerPageProps = {
	title?: string;
	pageScript: string;
	clientData?: Record<string, any>;
};

export function renderServerPage(
	component: ReactNode,
	{ title, pageScript, clientData }: ServerPageProps,
) {
	return renderToString(
		<Html title={title} pageScript={pageScript} clientData={clientData}>
			{component}
		</Html>,
	);
}
