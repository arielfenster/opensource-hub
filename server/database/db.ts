import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../../shared/env';
import * as schemas from './schemas';

const client = postgres(env.DATABASE.URL);
const db = drizzle(client, { schema: schemas });

export type Database = typeof db;
export { client, db };
