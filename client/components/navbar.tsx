export function Navbar() {
	return (
		<nav className='bg-red-400 p-4'>
			<div className='container mx-auto flex items-center justify-between'>
				<div className='mr-4'>
					<a href='/home' className='text-2xl font-bold text-white'>
						BookFinder
					</a>
				</div>
				<div className='flex items-center'>
					<a href='/about' className='mr-4 text-white hover:text-blue-200'>
						About
					</a>
				</div>
				<div className='ml-auto'>
					<a href='/login' className='text-white hover:text-blue-200'>
						Login
					</a>
				</div>
			</div>
		</nav>
	);
}
