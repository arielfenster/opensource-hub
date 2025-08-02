import { HomePage } from '$/client/pages/home';
import { type Context } from 'hono';
import { renderServerPageWithUser } from './render';

export async function renderHomePage(c: Context) {
	const html = await renderServerPageWithUser(c, <HomePage />, {
		page: 'home',
		title: 'Home',
	});

	return c.html(html);
}
