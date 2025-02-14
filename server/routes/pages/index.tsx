import { Hono } from 'hono';
import { AboutPage } from '../../../client/pages/about';
import { LoginPage } from '../../../client/pages/auth/login';
import { SignupPage } from '../../../client/pages/auth/signup';
import { HomePage } from '../../../client/pages/home';
import { renderServerPage } from '../../render';

export const pagesRouter = new Hono()
	.get('/', (c) => {
		return c.redirect('/home', 301);
	})
	.get('/home', (c) => {
		const html = renderServerPage(<HomePage />, {
			title: 'Home',
			page: 'home',
		});

		return c.html(html);
	})
	.get('/about', (c) => {
		const html = renderServerPage(<AboutPage />, {
			title: 'About',
			page: 'about',
		});

		return c.html(html);
	})
	.get('/login', (c) => {
		const html = renderServerPage(<LoginPage />, {
			title: 'Login',
			page: 'auth/login',
		});

		return c.html(html);
	})
	.get('/signup', (c) => {
		const html = renderServerPage(<SignupPage />, {
			title: 'Sign Up',
			page: 'auth/signup',
		});

		return c.html(html);
	});
