import type { CLIENT_DATA_NAME } from '../shared/constants';

type WindowWithClientData = Window & { [CLIENT_DATA_NAME]: Record<string, any> };

export function getWindow() {
	return window as any as WindowWithClientData;
}
