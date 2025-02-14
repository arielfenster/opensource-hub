import { serve } from '@hono/node-server';
import { env } from '../shared/env';
import { app } from './app';

// console.log(`Server is running on ${env.server.HOST_URL}`);

export default app;

// export default {
// 	fetch: app.fetch,
// } satisfies Parameters<typeof serve>['0'];
