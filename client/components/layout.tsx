import { type PropsWithChildren } from 'react';
import { Header } from './header';
import { Footer } from './footer';

export function Layout({ children }: PropsWithChildren) {
	return (
		<div className='bg-ghost-white flex min-h-full flex-col'>
			<Header />
			<main className='container mx-auto mb-12 flex-1'>{children}</main>
			<Footer />
		</div>
	);
}
