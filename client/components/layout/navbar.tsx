import type { UserDetails } from '$/shared/types/users';
import { LinkButton } from '../ui/link-button';

type NavbarProps = { user?: UserDetails };

export function Navbar({ user }: NavbarProps) {
	return (
		<nav className='text-ghost-white flex items-center gap-4 py-6'>
			<a href='/' className='text-3xl font-bold'>
				Opensource Hub
			</a>
			<a href='/projects' className='text-lg hover:underline'>
				Projects
			</a>
			<a href='/about' className='text-lg hover:underline'>
				About
			</a>
			{user ? (
				<LinkButton
					href='/projects/create'
					className='bg-cerise text-ghost-white hover:bg-red-500'
				>
					Create project
				</LinkButton>
			) : null}
		</nav>
	);
}
