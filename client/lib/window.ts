import type { DehydratedState } from '@tanstack/react-query';
import type { CLIENT_DATA_NAME, PREFETCHED_STATE_NAME } from '../../shared/constants';

type AppWindow = Window & { [CLIENT_DATA_NAME]: Record<string, any> } & {
	[PREFETCHED_STATE_NAME]: DehydratedState;
};

export function getWindow() {
	return window as any as AppWindow;
}

export function getPropertyFromClientData<T = string>(key: string): T | null {
	const { __CLIENT_DATA__ } = getWindow();
	return __CLIENT_DATA__?.[key] || null;
}
