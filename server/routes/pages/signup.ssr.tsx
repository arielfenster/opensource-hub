import { SignupPage } from '$/client/pages/auth/signup';
import { isUserLoggedIn } from '$/server/lib/auth';
import { renderServerPage } from './render';
import { type Context } from 'hono';

export function renderSignupPage(c: Context) {
	if (isUserLoggedIn(c)) {
		return c.redirect('/');
	}

	const html = renderServerPage(<SignupPage />, {
		page: 'auth/signup',
		title: 'Sign Up',
	});

	return c.html(html);
}
