import { loginSchema, type LoginInput } from '$/shared/schemas/auth/login.schema';
import { type Context } from 'hono';
import type { z } from 'zod';

type RouteContext = Context<
	{},
	any,
	{ in: { json: z.input<typeof loginSchema> }; out: { json: z.output<typeof loginSchema> } }
>;

export const authController = {
	async login(c: RouteContext) {
		c.req.valid('json')
	},
	async signup(c: Context) {
		return c.text('banana');
	},
};
