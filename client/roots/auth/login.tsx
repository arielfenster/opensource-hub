import { hydrateRoot } from 'react-dom/client';
import { LoginPage } from '../../pages/auth/login';

hydrateRoot(document.getElementById('app')!, <LoginPage />);
