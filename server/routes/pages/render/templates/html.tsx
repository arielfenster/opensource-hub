import { Body, type BodyProps } from './body';
import { Head, type HeadProps } from './head';

export type ServerPageProps = HeadProps & BodyProps;

export function Html({ title, pageScripts, prefetchedState, children }: ServerPageProps) {
	return (
		<html lang='en'>
			<Head pageScripts={pageScripts} title={title} />
			<Body pageScripts={pageScripts} prefetchedState={prefetchedState}>
				{children}
			</Body>
		</html>
	);
}
