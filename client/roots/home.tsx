import { hydrateRoot } from 'react-dom/client';
import { HomePage } from '../pages/home';
import { getWindow } from '../utils/window';

import '../index.css';

const { __CLIENT_DATA__ } = getWindow();

hydrateRoot(
	document.getElementById('app')!,
	<HomePage recentProjects={__CLIENT_DATA__['recentProjects']} />,
);
