import { hydrateRoot } from 'react-dom/client';
import { AboutPage } from '../pages/about';

import '../index.css';

hydrateRoot(document.getElementById('app')!, <AboutPage />);
