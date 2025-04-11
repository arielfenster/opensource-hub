import { hydrateRoot } from 'react-dom/client';
import { HomePage } from '../pages/home';

import '../index.css';

hydrateRoot(document.getElementById('app')!, <HomePage />);
