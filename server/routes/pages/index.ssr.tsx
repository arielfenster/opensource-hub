import { adminGuard } from '$/server/modules/auth/guards/admin.guard';
import { guestOnlyGuard } from '$/server/modules/auth/guards/guest-only.guard';
import { userOnlyGuard } from '$/server/modules/auth/guards/user-only.guard';
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
	.get('/login', guestOnlyGuard, renderLoginPage)
	.get('/signup', guestOnlyGuard, renderSignupPage)
	.get('/profile', userOnlyGuard, renderProfilePage)
	.get('/projects', renderProjectsPage)
	.get('/projects/create', renderCreateProjectPage)
	.get('/projects/:slug', renderProjectDetailsPage)
	.get('/admin', adminGuard, renderAdminPage);
