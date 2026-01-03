import { guestOnlyMiddleware } from '$/server/modules/auth/middlewares/guest-only.middleware';
import { socialAuthHandler } from '$/server/modules/social-auth/social-auth.handler';
import type { SocialAuthProvider } from '$/shared/types/auth';
import { Hono } from 'hono';

export const socialAuthRouter = new Hono()
	.use(guestOnlyMiddleware)
	.get('/:provider', async (c) => {
		const provider = c.req.param('provider') as SocialAuthProvider;
		const authUrl = await socialAuthHandler.connectWithSocialAuth(c, provider);
		return c.redirect(authUrl);
	})
	.get('/:provider/callback', async (c) => {
		const provider = c.req.param('provider') as SocialAuthProvider;
		await socialAuthHandler.verifySocialAuthCallback(c, provider);
		return c.redirect('/projects');
	});
