import { serve } from '@hono/node-server';
import { env } from '../shared/env';
import { app } from './app';

export default app;

// export default {
// 	fetch: app.fetch,
// } satisfies Parameters<typeof serve>['0'];
