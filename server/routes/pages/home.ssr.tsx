import { HomePage } from '$/client/pages/home';
import { renderServerPage, type RenderServerPageProps } from '$/server/render';
import { type Context } from 'hono';

function getProps(): RenderServerPageProps {
	return {
		page: 'home',
		title: 'Home',
	};
}

export function renderHomePage(c: Context) {
	const html = renderServerPage(<HomePage />, getProps());

	return c.html(html);
}
