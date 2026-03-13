import { LoginPage } from '$/client/pages/auth/login';
import { type Context } from 'hono';
import { renderServerPage } from './render';

export async function renderLoginPage(c: Context) {
	const html = await renderServerPage(c, <LoginPage />, {
		page: 'auth/login',
		title: 'Login',
	});

	return c.html(html);
}
