import type { AuthenticatedUser } from '$/shared/types/users';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, type PropsWithChildren } from 'react';

type AuthProviderValue = {
	user?: AuthenticatedUser | null;
};

const AuthContext = createContext<AuthProviderValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData<AuthenticatedUser>(['user']);

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}
