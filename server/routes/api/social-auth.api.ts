import { guestMiddleware } from '$/server/modules/auth/guest.middleware';
import { socialAuthHandler } from '$/server/modules/social-auth/social-auth.handler';
import { Hono } from 'hono';

export const socialAuthRouter = new Hono()
	.use(guestMiddleware)
	.get('/google', async (c) => {
		const authUrl = await socialAuthHandler.connectWithGoogle(c);
		return c.redirect(authUrl);
	})
	.get('/google/callback', async (c) => {
		await socialAuthHandler.verifyGoogleCallback(c);
		return c.redirect('/projects');
	})
	.get('/github', async (c) => {
		const authUrl = await socialAuthHandler.connectWithGithub(c);
		return c.redirect(authUrl);
	})
	.get('/github/callback', async (c) => {
		await socialAuthHandler.verifyGithubCallback(c);
		return c.redirect('/projects');
	})
	// .get('/gitlab', async (c) => {
	// 	const authUrl = await socialAuthHandler.connectWithGitlab(c);
	// 	return c.redirect(authUrl);
	// })
	// .get('/gitlab/callback', async (c) => {
	// 	return c.json({ message: `endpoint is  /gitlab/callback` });
	// });
