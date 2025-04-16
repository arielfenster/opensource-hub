import type { User } from '$/server/database/schemas';

type Props = {
	user?: Partial<User> | null;
};

export function Navbar({ user }: Props) {
	return (
		<nav className='text-ghost-white flex items-center gap-4 bg-white py-6'>
			<a href='/' className='text-3xl font-bold'>
				Opensource Hub
			</a>
			<a href='/projects' className='text-lg hover:underline'>
				Projects
			</a>
		</nav>
	);
}
