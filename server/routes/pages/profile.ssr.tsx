import { ProfilePage } from '$/client/pages/profile';
import type { Context } from 'hono';
import { renderServerPage } from './render';

export async function renderProfilePage(c: Context) {
	const html = await renderServerPage(c, <ProfilePage />, {
		page: 'profile',
		title: 'Profile',
	});

	return c.html(html);
}
