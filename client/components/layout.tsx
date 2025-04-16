import { type PropsWithChildren } from 'react';
import { Header } from './header';
import { Footer } from './footer';

export function Layout({ children }: PropsWithChildren) {
	return (
		<div className='bg-ghost-white flex h-[200vh] flex-col'>
			<Header />
			<main className='mb-12'>{children}</main>
			<Footer />
		</div>
	);
}
