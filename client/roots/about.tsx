import { hydrateRoot } from 'react-dom/client';
import { AboutPage } from '../pages/about';

hydrateRoot(document.getElementById('app')!, <AboutPage />);
