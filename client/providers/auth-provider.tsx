import type { AuthenticatedUser } from '$/shared/types/users';
import { createContext, useContext } from 'react';
import { getWindow, isServerSide } from '../lib/window';

type AuthProviderValue = {
	user?: AuthenticatedUser | null;
};

const AuthContext = createContext<AuthProviderValue | null>(null);

export function AuthProvider({ children }: React.PropsWithChildren<AuthProviderValue>) {
	const user = getUser();

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}

function getUser(): AuthenticatedUser | null {
	if (isServerSide()) {
		return null; // Server-side rendering does not have access to the client data
	}

	const { __CLIENT_DATA__ } = getWindow();
	return __CLIENT_DATA__?.['user'] || null;
}
