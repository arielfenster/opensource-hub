import type { AppSuperJsonResult } from '$/shared/superjson';
import type { DehydratedState } from '@tanstack/react-query';
// import type { CLIENT_DATA_NAME, } from '../../shared/constants';
import type { PREFETCHED_STATE_NAME } from '../../shared/constants';

// type AppWindow = Window & { [CLIENT_DATA_NAME]: Record<string, any> } & {
// 	[PREFETCHED_STATE_NAME]: AppSuperJsonResult<DehydratedState>;
// };
type AppWindow = Window & {
	[PREFETCHED_STATE_NAME]: AppSuperJsonResult<DehydratedState>;
};

export function getWindow() {
	return window as any as AppWindow;
}

export function isServerSide() {
	return typeof window === 'undefined';
}
