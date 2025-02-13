import { hydrateRoot } from 'react-dom/client';
import { SignupPage } from '../../pages/auth/signup';

hydrateRoot(document.getElementById('app')!, <SignupPage />);
