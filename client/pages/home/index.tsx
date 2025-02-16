import { Navbar } from '../../components/navbar';
import { getImagePath } from '../../utils/images';

export function HomePage() {
	return (
		<main className='bg-mint-500 bazooka h-screen'>
			<section className='flex flex-col'>
				<h1>Welcome to Opensource Hub!</h1>
				<h2>{'Your one-stop shop for sharing and collaborating open source projects'}</h2>
			</section>
			<div className='h-full'>
				<section className='flex w-full justify-between'>
					<h3>Have an awesome idea for a project?</h3>
					<p>
						Are you looking for more collaborators to work with you? Create your project
						and search for your dream team!
					</p>
					<img src={getImagePath('bookshelf.svg')} />
				</section>
				<section className='flex w-full flex-row-reverse justify-between'>
					<h3>Expand your knowledge!</h3>
					<p>
						Want to expand your knowledge and tech stack? Looking to dive deep into a
						framework but never had the opportunity? Search for projects by specific
						technologies to find exactly what you want!
					</p>
					<img src={getImagePath('bookshelf.svg')} />
				</section>
				<section className='flex w-full justify-between'>
					<h3>Various 3rd-party tools integrations!</h3>
					<p>
						Create your project with your favorite source control, chat and project
						management tools to bootstrap and kickstart your project!
					</p>
					<img src={getImagePath('bookshelf.svg')} />
				</section>
			</div>
		</main>
	);
}
