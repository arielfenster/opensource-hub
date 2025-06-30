import type { AuthenticatedUser } from '$/shared/types/users';
import { createContext, useContext, type PropsWithChildren } from 'react';

type AuthProviderValue = {
	user?: AuthenticatedUser | null;
};

const AuthContext = createContext<AuthProviderValue | null>(null);

export type AuthProviderProps = PropsWithChildren<AuthProviderValue>;

export function AuthProvider({ user, children }: AuthProviderProps) {
	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}
