import { ProjectsDataAccessor } from '../projects/projects.data-accessor';
import { SessionDataAccessor } from '../session/session.data-accessor';
import { SocialLinksDataAccessor } from '../social-links/social-links.data-accessor';
import { TechnologiesDataAccessor } from '../technologies/technologies.data-accessor';
import { UsersDataAccessor } from '../users/users.data-accessor';

export const dataAccessorsRegistry = {
	users: UsersDataAccessor,
	session: SessionDataAccessor,
	socialLinks: SocialLinksDataAccessor,
	technologies: TechnologiesDataAccessor,
	projects: ProjectsDataAccessor,
};

export type DataAccessors = {
	[K in keyof typeof dataAccessorsRegistry]: InstanceType<(typeof dataAccessorsRegistry)[K]>;
};
