import type { AppPage } from '$/shared/constants';

export function buildEntryInputName(page: AppPage) {
	return `client/roots/${page}.tsx`;
}
