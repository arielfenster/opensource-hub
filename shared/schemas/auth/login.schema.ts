import * as v from 'valibot';
import { signupSchema } from './signup.schema';

export const loginSchema = v.pick(signupSchema, ['email', 'password']);

export type LoginInput = v.InferInput<typeof loginSchema>;
