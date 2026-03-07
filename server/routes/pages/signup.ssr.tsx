import { SignupPage } from '$/client/pages/auth/signup';
import { type Context } from 'hono';
import { renderServerPage } from './render';

export async function renderSignupPage(c: Context) {
	const html = renderServerPage(c, <SignupPage />, {
		page: 'auth/signup',
		title: 'Sign Up',
	});

	return c.html(html);
}
