import { serve } from '@hono/node-server';
import { app } from './app';
import { env } from '../shared/env';

console.log(`Server is running on ${env.server.HOST_URL}`);

serve({
	fetch: app.fetch,
	port: env.server.PORT,
});
