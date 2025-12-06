import { PREFETCHED_USER_QUERY_KEY } from '$/shared/constants';
import type { UserDetails } from '$/shared/types/users';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useContext, type PropsWithChildren } from 'react';
import { useRpcQueryClient } from './rpc-query-provider';

type AuthProviderValue = {
	user?: UserDetails;
	logout: () => void;
};

const AuthContext = createContext<AuthProviderValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
	const rpcQueryClient = useRpcQueryClient();

	const { data: user } = useQuery({
		queryKey: PREFETCHED_USER_QUERY_KEY,
		queryFn: () => Promise.resolve({}) as Promise<UserDetails>, // this will either resolve with the SSR data or return undefined
		enabled: false,
	});

	const logoutMutation = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => rpcQueryClient.auth.logout.$post(),
		async onSuccess(response) {
			if (response.redirected) {
				window.location.href = response.url;
			} else {
				const data = await response.text();
				throw new Error(data);
			}
		},
	});

	const logout = useCallback(() => logoutMutation.mutate(), [logoutMutation]);

	return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}
