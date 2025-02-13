import { Hono } from 'hono';
import { LoginPage } from '../../../client/pages/auth/login';
import { SignupPage } from '../../../client/pages/auth/signup';
import { HomePage } from '../../../client/pages/home';
import { getPageScript } from '../../../shared/utils';
import { renderServerPage } from '../../render';
import { AboutPage } from '../../../client/pages/about';

export const pagesRouter = new Hono()
	.get('/', (c) => {
		return c.redirect('/home', 301);
	})
	.get('/home', (c) => {
		const html = renderServerPage(<HomePage />, {
			title: 'Home',
			pageScript: getPageScript('home'),
		});

		return c.html(html);
	})
	.get('/about', (c) => {
		const html = renderServerPage(<AboutPage />, {
			title: 'About',
			pageScript: getPageScript('about'),
		});

		return c.html(html);
	})
	.get('/login', (c) => {
		const html = renderServerPage(<LoginPage />, {
			title: 'Login',
			pageScript: getPageScript('auth/login'),
		});

		return c.html(html);
	})
	.get('/signup', (c) => {
		const html = renderServerPage(<SignupPage />, {
			title: 'Sign Up',
			pageScript: getPageScript('auth/signup'),
		});

		return c.html(html);
	});
