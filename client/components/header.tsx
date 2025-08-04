import { UserCircleIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../providers/auth-provider';
import { Button } from './ui/button';
import { DropdownMenu } from './ui/dropdown-menu';

export function Header() {
	const { user, logout } = useAuth();

	return (
		<header className='bg-royal-blue text-ghost-white w-full'>
			<div className='flex items-center px-16'>
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
						<DropdownMenu>
							<DropdownMenu.Trigger>
								<UserCircleIcon className='h-10 w-10' />
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item
									text='Profile'
									image={<UserCircleIcon />}
									href='/profile'
								/>
								<DropdownMenu.Item
									text='Logout'
									image={<LogOutIcon />}
									onClick={logout}
								/>
							</DropdownMenu.Content>
						</DropdownMenu>
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
