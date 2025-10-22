import { Card } from '$/client/components/ui/card';

type RecentActivityCardProps = {};

// TODO: implement
export function RecentActivityCard({}: RecentActivityCardProps) {
	return (
		<Card>
			<Card.Header>
				<Card.Title className='flex gap-2'>Recent Activity</Card.Title>
			</Card.Header>
			<Card.Body>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ipsa mollitia
				suscipit sapiente quaerat possimus dolore id iste debitis sit vitae unde praesentium
				adipisci quibusdam, temporibus, iure, neque eius laborum excepturi quasi veritatis
				pariatur consequatur doloremque aperiam? Fuga repellat deleniti doloribus? Vero,
				ipsa dignissimos explicabo laudantium ex ratione magni, officiis, pariatur quam
				eaque laboriosam. Quae explicabo autem eaque corporis distinctio!
			</Card.Body>
		</Card>
	);
}
