import { TechnologiesAutoCompleteContainer } from '$/client/components/technologies-autocomplete';
import { Button } from '$/client/components/ui/button';
import { Card } from '$/client/components/ui/card';
import { useTechnologies } from '$/client/hooks/useTechnologies';
import { cn } from '$/client/lib/utils';
import { ChevronLeftIcon } from 'lucide-react';
import { useCreateProjectContext } from '../context';

export function ProjectTechnologiesStep() {
	const { selectedTechnologies, addTechnology, removeTechnology } = useTechnologies();
	const { goBack, onStepSubmit } = useCreateProjectContext();

	return (
		<Card className='w-2/3'>
			<Card.Header>
				<Card.Title className='text-3xl'>Technology Stack</Card.Title>
			</Card.Header>
			<Card.Body>
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
					className='text-ghost-white flex gap-1 self-end rounded-lg font-normal'
				>
					<span className='text-lg'>Submit</span>
				</Button>
			</Card.Footer>
		</Card>
	);
}
