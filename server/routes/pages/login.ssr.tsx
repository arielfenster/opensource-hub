import { LoginPage } from '$/client/pages/auth/login';
import { isUserLoggedIn } from '$/server/lib/auth';
import { renderServerPage } from './render';
import { type Context } from 'hono';

export async function renderLoginPage(c: Context) {
	if (isUserLoggedIn(c)) {
		return c.redirect('/');
	}

	const html = await renderServerPage(c, <LoginPage />, {
		page: 'auth/login',
		title: 'Login',
	});

	return c.html(html);
}
