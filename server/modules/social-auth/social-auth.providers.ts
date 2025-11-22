import { env } from '$/shared/env';
import type { SocialAuthProvider } from '$/shared/types/auth';
import { GitHub, Google } from 'arctic';

export const google = new Google(
	env.SOCIAL_AUTH.GOOGLE_CLIENT_ID,
	env.SOCIAL_AUTH.GOOGLE_CLIENT_SECRET,
	getCallbackUrl('google'),
);

export const github = new GitHub(
	env.SOCIAL_AUTH.GITHUB_CLIENT_ID,
	env.SOCIAL_AUTH.GITHUB_CLIENT_SECRET,
	getCallbackUrl('github'),
);

function getCallbackUrl(provider: SocialAuthProvider) {
	return `${env.HOST_URL}/api/social-auth/${provider}/callback`;
}

// export const gitlab = new GitLab(
// 	'',
// 	env.SOCIAL_AUTH.GITLAB_CLIENT_ID,
// 	env.SOCIAL_AUTH.GITLAB_CLIENT_SECRET,
// 	env.HOST_URL + '/api/social-auth/gitlab/callback',
// );
