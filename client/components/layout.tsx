import { type PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren) {
	return (
		<div>
			<nav className='bg-blue-600 p-4 text-white'>
				<div className='container mx-auto flex justify-between items-center'>
					<a href='/' className='text-2xl font-bold'>
						MovieFinder
					</a>
					<div className='space-x-4'>
						<a href='/search' className='hover:text-blue-200'>
							Search
						</a>
						<a href='/about' className='hover:text-blue-200'>
							About
						</a>
					</div>
				</div>
			</nav>
			<main className='container mx-auto py-8 px-4'>{children}</main>
		</div>
	);
}
