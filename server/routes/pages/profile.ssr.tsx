import type { Context } from 'hono';
import { renderServerPageWithUser } from './render';
import { ProfilePage } from '$/client/pages/profile';
import { isUserLoggedIn } from '$/server/lib/auth';

export async function renderProfilePage(c: Context) {
	if (!isUserLoggedIn(c)) {
		return c.redirect('/');
	}

	const html = await renderServerPageWithUser(c, <ProfilePage />, {
		page: 'profile',
		title: 'Profile',
	});

	return c.html(html);
}
