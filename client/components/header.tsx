export function Header() {
	return (
		<header className='bg-royal-blue text-ghost-white w-full'>
			<div className='container mx-auto flex items-center px-16'>
				<nav className='text-ghost-white flex items-center gap-4 py-6'>
					<a href='/' className='text-3xl font-bold'>
						Opensource Hub
					</a>
					<a href='/projects' className='text-lg hover:underline'>
						Projects
					</a>
				</nav>
				<div className='ml-auto'>
					<a href='/login' className='text-lg hover:underline'>
						Login
					</a>
				</div>
			</div>
		</header>
	);
}
