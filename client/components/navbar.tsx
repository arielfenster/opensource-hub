export function Navbar() {
	return (
		<nav className='bg-blue-600 p-4'>
			<div className='container mx-auto flex items-center justify-between'>
				<div className='mr-4'>
					<a href='/home' className='text-white text-2xl font-bold'>
						BookFinder
					</a>
				</div>
				<div className='flex items-center'>
					<a href='/about' className='text-white mr-4 hover:text-blue-200'>
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
