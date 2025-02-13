import { serve } from '@hono/node-server';
import { env } from '../shared/env';
import { app } from './app';

console.log(`Server is running on ${env.server.HOST_URL}`);

serve({
	fetch: app.fetch,
	port: env.server.PORT,
});
