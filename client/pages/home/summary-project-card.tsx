import { Card } from '$/client/components/ui/card';

type Props = { name: string; technologies: string[]; shortDescription: string };

export function SummaryProjectCard({ name, technologies, shortDescription }: Props) {
	return (
		<Card className='bg-ghost-white w-80'>
			<Card.CardHeader title={name} subtitle={technologies.join(', ')} />
			<Card.CardBody>{shortDescription}</Card.CardBody>
		</Card>
	);
}
