import z from 'zod';

export const urlSchema = z.url({
	protocol: /^https$/,
	hostname: z.regexes.hostname,
});
