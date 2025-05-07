import { AboutPage } from '$/client/pages/about';
import { renderServerPage, type RenderServerPageProps } from '$/server/render';
import { type Context } from 'hono';

function getProps(): RenderServerPageProps {
	return {
		page: 'about',
		title: 'About',
	};
}

export function renderAboutPage(c: Context) {
	const html = renderServerPage(<AboutPage />, getProps());

	return c.html(html);
}
