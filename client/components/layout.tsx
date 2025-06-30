import { AuthProvider, type AuthProviderProps } from '../providers/auth-provider';
import { Footer } from './footer';
import { Header } from './header';

export function Layout({ user, children }: AuthProviderProps) {
	return (
		<AuthProvider user={user}>
			<div className='bg-ghost-white flex min-h-full flex-col'>
				<Header />
				<main className='container mx-auto mb-12 flex-1'>{children}</main>
				<Footer />
			</div>
		</AuthProvider>
	);
}
