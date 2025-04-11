import { hydrateRoot } from 'react-dom/client';
import { LoginPage } from '../../pages/auth/login';

import '../../index.css';

hydrateRoot(document.getElementById('app')!, <LoginPage />);
