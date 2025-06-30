import { HomePage } from '$/client/pages/home';
import { usersHandler } from '$/server/modules/users/users.handler';
import { renderServerPage } from './render';
import { type Context } from 'hono';

export async function renderHomePage(c: Context) {
	const user = await usersHandler.getCurrentUser(c);

	const html = renderServerPage(<HomePage user={user} />, {
		page: 'home',
		title: 'Home',
		clientData: {
			user,
		},
	});

	return c.html(html);
}
