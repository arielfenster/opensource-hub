import { ExpensiveComponent, Test } from './test';

export function AboutPage() {
	return (
		<div className='flex flex-col gap-8 px-4 py-8'>
			<h1 className='text-royal-blue text-4xl font-semibold'>About Opensource Hub</h1>
			<div className='rounded-lg bg-white p-6 shadow-md'>
				<p className='text-eerie-black mb-4'>
					Opensource Hub is a powerful web application designed to connect developers and
					other relevant positions in the open source community. Our platform allows users
					to share the projects they are working on and collaborate with other
					enthusiasts.
				</p>
				<h3 className='text-eerie-black mb-4 font-bold'>With Opensource Hub, you can:</h3>
				<ul className='text-eerie-black mb-4 list-inside list-disc'>
					<li>
						Search projects by various criteria to find the ones that match your
						interests
					</li>
					<li>
						View detailed information about each project, including descriptions and
						contributors
					</li>
					<li>Connect with other developers and collaborate on projects</li>
					<li>
						Select your favorite source control, chat, and project management tools to
						easily manage your projects
					</li>
				</ul>
				<p className='text-eerie-black'>
					We're passionate about fostering collaboration and innovation in the open source
					community. Join us and start sharing your projects today!
				</p>
			</div>
			<Test>
				<ExpensiveComponent />
			</Test>
		</div>
	);
}
