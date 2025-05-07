import { LoginPage } from '$/client/pages/auth/login';
import { type Context } from 'hono';
import { renderServerPage, type RenderServerPageProps } from '$/server/render';
import { isUserLoggedIn } from '$/server/lib/auth';

function getProps(): RenderServerPageProps {
	return {
		page: 'auth/login',
		title: 'Login',
	};
}

export function renderLoginPage(c: Context) {
	if (isUserLoggedIn(c)) {
		return c.redirect('/');
	}

	const html = renderServerPage(<LoginPage />, getProps());

	return c.html(html);
}
