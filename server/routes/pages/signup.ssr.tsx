import { SignupPage } from '$/client/pages/auth/signup';
import { isUserLoggedIn } from '$/server/lib/auth';
import { renderServerPage, type RenderServerPageProps } from '$/server/render';
import { type Context } from 'hono';

function getProps(): RenderServerPageProps {
	return {
		page: 'auth/signup',
		title: 'Sign Up',
	};
}

export function renderSignupPage(c: Context) {
	if (isUserLoggedIn(c)) {
		return c.redirect('/');
	}

	const html = renderServerPage(<SignupPage />, getProps());

	return c.html(html);
}
