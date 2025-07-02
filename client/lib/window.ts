import type { CLIENT_DATA_NAME } from '../../shared/constants';

type WindowWithClientData = Window & { [CLIENT_DATA_NAME]: Record<string, any> };

export function getWindow() {
	return window as any as WindowWithClientData;
}

export function getPropertyFromClientData<T = string>(key: string): T | null {
	const { __CLIENT_DATA__ } = getWindow();
	return __CLIENT_DATA__?.[key] || null;
}
