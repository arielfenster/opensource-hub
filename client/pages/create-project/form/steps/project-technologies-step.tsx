import { TechnologiesAutoCompleteContainer } from '$/client/components/technologies-autocomplete';
import { Button } from '$/client/components/ui/button';
import { Card } from '$/client/components/ui/card';
import { useTechnologies } from '$/client/hooks/useTechnologies';
import { cn } from '$/client/lib/utils';
import { ChevronLeftIcon } from 'lucide-react';
import { useCreateProjectContext } from '../context';

export function ProjectTechnologiesStep() {
	const { selectedTechnologies, addTechnology, removeTechnology } = useTechnologies();
	const { goBack, onStepSubmit, loading, error } = useCreateProjectContext();

	return (
		<Card className='w-2/3'>
			<Card.Header>
				<Card.Title className='text-3xl'>Technology Stack</Card.Title>
			</Card.Header>
			<Card.Body className='flex flex-col gap-4'>
				<form
					className='flex flex-col gap-4'
					id='project-technologies-step'
					onSubmit={(event) => {
						event.preventDefault();
						onStepSubmit({ technologies: selectedTechnologies });
					}}
				>
					<TechnologiesAutoCompleteContainer
						className='w-full'
						onSelect={addTechnology}
						onRemove={removeTechnology}
					/>
				</form>
				{error && (
					<div className='border-2 border-red-600 bg-red-100 p-4'>
						<div className='flex items-center gap-4'>
							<span className='text-ghost-white h-5 w-5 rounded-full bg-red-600 text-center text-sm font-semibold'>
								X
							</span>
							<div className='flex flex-col'>
								<span className='text-lg font-medium text-red-800'>
									Error creating project
								</span>
								<span className='text-base text-red-600'>{error}</span>
							</div>
						</div>
					</div>
				)}
			</Card.Body>
			<Card.Footer className='flex justify-between'>
				<Button
					className={cn(
						'text-eerie-black hover:text-eerie-black/80 flex gap-1 bg-transparent px-0 font-normal hover:bg-transparent',
					)}
					onClick={goBack}
				>
					<ChevronLeftIcon />
					<span className='text-lg'>Previous</span>
				</Button>
				<Button
					type='submit'
					form='project-technologies-step'
					className='text-ghost-white flex self-end rounded-lg font-normal'
					loading={loading}
				>
					<span className='text-lg'>Submit</span>
				</Button>
			</Card.Footer>
		</Card>
	);
}
