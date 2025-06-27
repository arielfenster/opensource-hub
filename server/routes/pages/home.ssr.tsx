import { HomePage } from '$/client/pages/home';
import { renderServerPageWithUser } from './render';
import { type Context } from 'hono';

export async function renderHomePage(c: Context) {
	const html = await renderServerPageWithUser(c, <HomePage />, {
		page: 'home',
		title: 'Home',
	});

	return c.html(html);
}
