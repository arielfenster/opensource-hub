import { AboutPage } from '$/client/pages/about';
import { type Context } from 'hono';
import { renderServerPageWithUser } from './render';

export async function renderAboutPage(c: Context) {
	const html = await renderServerPageWithUser(c, <AboutPage />, {
		page: 'about',
		title: 'About',
	});

	return c.html(html);
}
