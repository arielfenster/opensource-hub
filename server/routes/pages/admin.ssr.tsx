import { AdminPage } from '$/client/pages/admin';
import { type Context } from 'hono';
import { renderServerPage } from './render';

export async function renderAdminPage(c: Context) {
	const html = await renderServerPage(c, <AdminPage />, {
		page: 'admin',
		title: 'Admin Dashboard',
	});

	return c.html(html);
}
