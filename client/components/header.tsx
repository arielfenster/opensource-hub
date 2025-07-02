import { UserCircleIcon } from 'lucide-react';
import { useAuth } from '../providers/auth-provider';
import { Button } from './ui/button';
import { Dropdown } from './ui/dropdown';

export function Header() {
	const { user } = useAuth();

	return (
		<header className='bg-royal-blue text-ghost-white w-full'>
			<div className='container mx-auto flex items-center px-16'>
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
				</nav>
				<div className='ml-auto'>
					{user ? (
						<Dropdown>
							<Dropdown.Trigger>
								<UserCircleIcon className='h-10 w-10' />
							</Dropdown.Trigger>
							<Dropdown.Content>{user.email}</Dropdown.Content>
						</Dropdown>
					) : (
						<a href='/login' className='text-lg'>
							<Button>Login</Button>
						</a>
					)}
				</div>
			</div>
		</header>
	);
}
