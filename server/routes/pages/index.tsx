import { Hono } from 'hono';
import { AboutPage } from '../../../client/pages/about';
import { LoginPage } from '../../../client/pages/auth/login';
import { SignupPage } from '../../../client/pages/auth/signup';
import { HomePage } from '../../../client/pages/home';
import { renderServerPage } from '../../render';

export const pagesRouter = new Hono()
	.get('/', (c) => {
		const props = {
			recentProjects: [
				{
					id: '1',
					name: 'Project 1',
					tags: ['React', 'Node.js'],
					shortDescription: 'A cool project that does cool things.',
				},
				{
					id: '2',
					name: 'Project 2',
					tags: ['Vue', 'Express'],
					shortDescription: 'Another cool project that does even cooler things.',
				},
				{
					id: '3',
					name: 'Project 3',
					tags: ['Angular', 'Django'],
					shortDescription: 'A project that is just okay.',
				},
				{
					id: '4',
					name: 'Project 4',
					tags: ['Svelte', 'Flask'],
					shortDescription: 'A project that is not so cool.',
				},
				{
					id: '5',
					name: 'Project 5',
					tags: ['Next.js', 'Ruby on Rails'],
					shortDescription: 'A project that is not cool at all.',
				},
				{
					id: '6',
					name: 'Project 6',
					tags: ['Golang', 'Spring'],
					shortDescription: 'A project that is not cool at all.',
				},
			],
		};

		const html = renderServerPage(<HomePage {...props} />, {
			title: 'Home',
			page: 'home',
			clientData: props,
		});

		return c.html(html);
	})
	.get('/about', (c) => {
		const html = renderServerPage(<AboutPage />, {
			title: 'About',
			page: 'about',
		});

		return c.html(html);
	})
	.get('/login', (c) => {
		const html = renderServerPage(<LoginPage />, {
			title: 'Login',
			page: 'auth/login',
		});

		return c.html(html);
	})
	.get('/signup', (c) => {
		const html = renderServerPage(<SignupPage />, {
			title: 'Sign Up',
			page: 'auth/signup',
		});

		return c.html(html);
	});
