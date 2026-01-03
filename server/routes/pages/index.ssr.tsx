import { adminGuard } from '$/server/modules/auth/guards/admin.guard';
import { guestGuard } from '$/server/modules/auth/guards/guest.guard';
import { loggedInGuard } from '$/server/modules/auth/guards/logged-in.guard';
import { Hono } from 'hono';
import { renderAboutPage } from './about.ssr';
import { renderAdminPage } from './admin.ssr';
import { renderHomePage } from './home.ssr';
import { renderLoginPage } from './login.ssr';
import { renderProfilePage } from './profile.ssr';
import {
	renderCreateProjectPage,
	renderProjectDetailsPage,
	renderProjectsPage,
} from './projects.ssr';
import { renderSignupPage } from './signup.ssr';

export const pagesRouter = new Hono()
	.get('/', renderHomePage)
	.get('/about', renderAboutPage)
	.get('/login', guestGuard, renderLoginPage)
	.get('/signup', guestGuard, renderSignupPage)
	.get('/profile', loggedInGuard, renderProfilePage)
	.get('/projects', renderProjectsPage)
	.get('/projects/create', renderCreateProjectPage)
	.get('/projects/:slug', renderProjectDetailsPage)
	.get('/admin', adminGuard, renderAdminPage);
