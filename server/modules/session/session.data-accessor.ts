import { db } from '../../database/db';
import { sessions, type Session } from '../../database/schemas';

type InsertSessionPayload = Pick<Session, 'id' | 'userId' | 'expiresAt'>;

class SessionDataAccessor {
	async insertSession(data: InsertSessionPayload) {
		const [session] = await db.insert(sessions).values(data).returning();
		return session;
	}

	async findSessionById(sessionId: string) {
		return db.query.sessions.findFirst({
			where(fields, { eq }) {
				return eq(fields.id, sessionId);
			},
		});
	}
}

export const sessionDataAccessor = new SessionDataAccessor();
