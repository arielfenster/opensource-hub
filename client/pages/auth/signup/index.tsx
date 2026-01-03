import { useSignup } from './hook';
import { SignupView } from './view';

export function SignupPage() {
	const { signup, loading, error } = useSignup();

	return <SignupView signup={signup} loading={loading} error={error} />;
}
