import { SessionDataAccessor } from '../session/session.data-accessor';
import { UsersDataAccessor } from '../users/users.data-accessor';

// TODO: use import.meta.glob to find all data accessors
export const dataAccessorsRegistry = {
	users: UsersDataAccessor,
	session: SessionDataAccessor,
};

export type DataAccessors = {
	[K in keyof typeof dataAccessorsRegistry]: InstanceType<(typeof dataAccessorsRegistry)[K]>;
};
