import { Input } from '$/client/components/form/input';
import { SearchIcon } from 'lucide-react';

export function ProjectsPage() {
	return (
		<div className='flex flex-col gap-6 px-4 py-8'>
			<h1 className='text-royal-blue text-4xl font-semibold'>Discover Projects</h1>
			<Input
				name='filter'
				className='border border-gray-300 py-4 text-lg'
				startIcon={<SearchIcon className='text-gray-300' />}
				placeholder='Search projects by name, technology, or description...'
			/>
		</div>
	);
}
