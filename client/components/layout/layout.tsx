import type { PropsWithChildren } from 'react';
import { Footer } from './footer';
import { Header } from './header';

export function Layout({ children }: PropsWithChildren) {
	return (
		<div className='bg-ghost-white flex min-h-full flex-col'>
			<Header />
			<main className='mx-auto mb-12 w-[85%] flex-1'>{children}</main>
			<Footer />
		</div>
	);
}
