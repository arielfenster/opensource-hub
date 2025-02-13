import { Navbar } from '../../components/navbar';
import { getImagePath } from '../../../shared/utils';

export function HomePage() {
	return (
		<div className='min-h-screen bg-gray-100'>
			<Navbar />
			<div className='container mx-auto px-4 py-8'>
				<div className='flex flex-col md:flex-row items-center justify-between'>
					<div className='md:w-1/2 mb-8 md:mb-0'>
						<h1 className='text-4xl font-bold text-blue-600 mb-4'>Welcome to BookFinder</h1>
						<p className='text-xl text-gray-700 mb-6'>
							Discover your next favorite book with our powerful search engine. Search by title,
							author, or genre to find the perfect read.
						</p>
						<a
							href='/search'
							className='bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300'
						>
							Start Searching
						</a>
					</div>
					<div className='md:w-1/2'>
						<img
							src={getImagePath('homepage.webp')}
							alt='Search your favorite books using BookFinder!'
							className='rounded-lg shadow-lg'
							height={400}
							width={400}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
