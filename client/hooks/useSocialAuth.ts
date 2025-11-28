import type { SocialAuthProvider } from '$/shared/types/auth';
import { useRpcQueryClient } from '../providers/rpc-query-provider';

export function useSocialAuth() {
	const rpcQueryClient = useRpcQueryClient();

	function authenticate(provider: SocialAuthProvider) {
		const url = rpcQueryClient['social-auth'][provider].$url().toString();

		window.open(url, '_self');
	}

	return { authenticate };
}
