export const PAGES = ['home', 'about', 'auth/login', 'auth/signup', 'profile', 'projects'] as const;
export type AppPage = (typeof PAGES)[number];

const ENTRY_INPUT_NAME_PREFIX = 'client/roots';

export function buildEntryInputName(page: AppPage) {
	return `${ENTRY_INPUT_NAME_PREFIX}/${page}.tsx`;
}
