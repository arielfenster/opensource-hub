import { Button } from '$/client/components/ui/button';

export function CallToActionSection() {
	return (
		<div className='text-royal-blue flex flex-col items-center gap-4 text-center'>
			<span className='text-3xl'>What are you waiting for? Join the Hub</span>
			<a href='/login'>
				<Button>Get started</Button>
			</a>
		</div>
	);
}
