import type { AuthenticatedUser } from '$/shared/types/users';
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, type PropsWithChildren } from 'react';

type AuthProviderValue = {
	user?: AuthenticatedUser;
};

const AuthContext = createContext<AuthProviderValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
	const { data: user } = useQuery({
		queryKey: ['user'],
		queryFn: () => Promise.resolve({}) as Promise<AuthenticatedUser>, // this will either resolve with the SSR data or return undefined
		enabled: false,
	});

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}
