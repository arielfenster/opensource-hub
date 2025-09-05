import { Body, type BodyProps } from './templates/body';
import { Head, type HeadProps } from './templates/head';

export type ServerPageProps = HeadProps & BodyProps;

export function ServerPage({ title, pageScripts, prefetchedState, children }: ServerPageProps) {
	return (
		<html lang='en'>
			<Head pageScripts={pageScripts} title={title} />
			<Body pageScripts={pageScripts} prefetchedState={prefetchedState}>
				{children}
			</Body>
		</html>
	);
}
