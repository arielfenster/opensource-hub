import { Navbar } from '../../components/navbar';

export function AboutPage() {
	return (
		<div className='min-h-screen bg-gray-100'>
			<Navbar />
			<div className='container mx-auto px-4 py-8'>
				<h1 className='text-3xl font-bold text-blue-600 mb-6'>About BookFinder</h1>
				<div className='bg-white rounded-lg shadow-md p-6'>
					<p className='text-gray-700 mb-4'>
						BookFinder is a powerful web application designed to help book enthusiasts discover
						their next great read. Our platform leverages a comprehensive third-party API to provide
						you with up-to-date information on a vast collection of books across various genres.
					</p>
					<p className='text-gray-700 mb-4'>With BookFinder, you can:</p>
					<ul className='list-disc list-inside text-gray-700 mb-4'>
						<li>Search for books by title, author, or keywords</li>
						<li>Filter results by genre to narrow down your search</li>
						<li>View detailed information about each book, including summaries and ratings</li>
						<li>Discover new authors and expand your reading horizons</li>
					</ul>
					<p className='text-gray-700'>
						We're passionate about connecting readers with their perfect books. Happy searching!
					</p>
				</div>
			</div>
		</div>
	);
}
