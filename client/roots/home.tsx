import { hydrateRoot } from 'react-dom/client';
import { HomePage } from '../pages/home';

hydrateRoot(document.getElementById('app')!, <HomePage />);
