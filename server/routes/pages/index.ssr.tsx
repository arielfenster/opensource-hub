import { Hono } from 'hono';
import { renderAboutPage } from './about.ssr';
import { renderHomePage } from './home.ssr';
import { renderLoginPage } from './login.ssr';
import { renderSignupPage } from './signup.ssr';
import { renderProfilePage } from './profile.ssr';
import { renderProjectsPage } from './projects.ssr';

export const pagesRouter = new Hono()
	.get('/', renderHomePage)
	.get('/about', renderAboutPage)
	.get('/login', renderLoginPage)
	.get('/signup', renderSignupPage)
	.get('/profile', renderProfilePage)
	.get('/projects', renderProjectsPage);
