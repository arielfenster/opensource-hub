import { Navbar } from '../../components/navbar';

export function AboutPage() {
	return (
		<div className='min-h-screen bg-gray-100'>
			<Navbar
				user={{
					id: 'meow',
				}}
			/>
			<div className='container mx-auto px-4 py-8'>
				<h1 className='mb-6 text-3xl font-bold text-blue-600'>About BookFinder</h1>
				<div className='rounded-lg bg-white p-6 shadow-md'>
					<p className='mb-4 text-gray-700'>
						BookFinder is a powerful web application designed to help book enthusiasts
						discover their next great read. Our platform leverages a comprehensive
						third-party API to provide you with up-to-date information on a vast
						collection of books across various genres.
					</p>
					<p className='mb-4 text-gray-700'>With BookFinder, you can:</p>
					<ul className='mb-4 list-inside list-disc text-gray-700'>
						<li>Search for books by title, author, or keywords</li>
						<li>Filter results by genre to narrow down your search</li>
						<li>
							View detailed information about each book, including summaries and
							ratings
						</li>
						<li>Discover new authors and expand your reading horizons</li>
					</ul>
					<p className='text-gray-700'>
						We're passionate about connecting readers with their perfect books. Happy
						searching!
					</p>
				</div>
			</div>
		</div>
	);
}
