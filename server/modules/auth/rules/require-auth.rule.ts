import { isUserLoggedIn } from '$/server/lib/auth';
import type { Context } from 'hono';

export function requireAuthRule(c: Context) {
	return isUserLoggedIn(c);
}
