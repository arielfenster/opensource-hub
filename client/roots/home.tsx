import { hydrateRoot } from 'react-dom/client';
import { HomePage } from '../pages/home';
import { getWindow } from '../lib/window';

import '../index.css';

const { __CLIENT_DATA__ } = getWindow();
const user = __CLIENT_DATA__?.['user'];

hydrateRoot(
	document.getElementById('app')!,
	// <HomePage recentProjects={__CLIENT_DATA__['recentProjects']} />,
	<HomePage user={user} />,
);
