import { db } from '../../database/db';
import { sessions, type Session } from '../../database/schemas';
import { DataAccessor } from '../dal/data-accessor';

type InsertSessionPayload = Pick<Session, 'id' | 'userId' | 'expiresAt'>;

export class SessionDataAccessor extends DataAccessor {
	async insertSession(data: InsertSessionPayload) {
		const [session] = await this.db.insert(sessions).values(data).returning();
		return session;
	}

	async findSessionById(sessionId: string) {
		return this.db.query.sessions.findFirst({
			where(fields, { eq }) {
				return eq(fields.id, sessionId);
			},
		});
	}
}

export const sessionDataAccessor = new SessionDataAccessor(db);
