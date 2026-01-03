import { useLogin } from './hook';
import { LoginView } from './view';

export function LoginPage() {
	const { login, loading, error } = useLogin();

	return <LoginView login={login} loading={loading} error={error} />;
}
