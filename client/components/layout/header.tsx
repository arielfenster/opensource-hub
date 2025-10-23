import { LogOutIcon, UserCircleIcon } from 'lucide-react';
import { useAuth } from '../../providers/auth-provider';
import { Button } from '../ui/button';
import { Dropdown } from '../ui/dropdown';
import { Navbar } from './navbar';

export function Header() {
	const { user, logout } = useAuth();

	return (
		<header className='bg-royal-blue text-ghost-white w-full'>
			<div className='flex items-center px-16'>
				<Navbar user={user} />
				<div className='ml-auto'>
					{user ? (
						<Dropdown>
							<Dropdown.Trigger>
								<UserCircleIcon className='h-10 w-10' />
							</Dropdown.Trigger>
							<Dropdown.Content className='right-1'>
								<Dropdown.Item className='p-3 transition-all duration-300 ease-in-out hover:rounded-lg hover:bg-gray-300'>
									<a
										href='/profile'
										className='text-eerie-black flex items-center gap-4'
									>
										<UserCircleIcon className='h-6 w-6' />
										Profile
									</a>
								</Dropdown.Item>
								<Dropdown.Item className='p-3 transition-all duration-300 ease-in-out hover:rounded-lg hover:bg-gray-300'>
									<a
										href='#'
										className='text-eerie-black flex items-center gap-4'
										onClick={logout}
									>
										<LogOutIcon className='h-6 w-6' />
										Logout
									</a>
								</Dropdown.Item>
							</Dropdown.Content>
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
