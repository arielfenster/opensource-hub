import { passwordService } from '$/server/modules/auth/password.service';
import { technologyGroupNames } from '$/shared/types/technologies';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import {
	projects,
	technologies,
	technologyGroups,
	users,
	type User,
	projectsToTechnologies,
	type Project,
	projectLinks,
} from '../schemas';
import { projectsService } from '$/server/modules/projects/projects.service';

async function seed() {
	const user = await insertUsers();
	await insertTechnologies();
	const projects = await insertProjects(user);
	await addTechnologiesToProjects(projects);
	await addProjectLinks(projects);
}

async function insertUsers() {
	const password = await passwordService.hashPassword('arielfenster');
	const createdUsers = await db
		.insert(users)
		.values({
			firstName: 'Ariel',
			lastName: 'Test',
			email: 'ariel@gmail.com',
			password: password,
			role: 'Admin',
		})
		.returning();

	console.log('Successfully inserted users');

	return createdUsers[0];
}

async function insertTechnologies() {
	const groups = await db
		.insert(technologyGroups)
		.values(technologyGroupNames.map((name) => ({ name })))
		.returning();

	const [
		languagesGroup,
		frameworksGroup,
		databasesGroup,
		infraGroup,
		servicesGroup,
		developerToolsGroup,
		cloudsGroup,
	] = groups;

	const languages = [
		'Assembly',
		'C',
		'C++',
		'C#',
		'CoffeeScript',
		'Java',
		'Python',
		'JavaScript',
		'PHP',
		'Go',
		'Swift',
		'Kotlin',
		'Perl',
		'Ruby',
		'Rust',
		'Dart',
		'Julia',
		'Scala',
		'Lua',
		'TypeScript',
		'Clojure',
		'Elixir',
		'HTML',
		'CSS',
		'SCSS',
		'Solidity',
		'Groovy',
		'MatLab',
		'Erlang',
	];
	await db
		.insert(technologies)
		.values(languages.map((name) => ({ name, groupId: languagesGroup.id })))
		.execute();

	const frameworks = [
		'Express.js',
		'Node.js',
		'NestJS',
		'Hono',
		'Angular',
		'React',
		'Vue',
		'Spring',
		'Django',
		'Flask',
		'Laravel',
		'Ruby on Rails',
		'Gatsby',
		'Next.js',
		'Nuxt',
		'Phoenix',
		'Remix',
		'Ionic',
		'React Native',
		'Astro',
		'Flutter',
		'Svelte',
		'Svelte Kit',
		'Rocket',
		'Tailwind',
	];
	await db
		.insert(technologies)
		.values(frameworks.map((name) => ({ name, groupId: frameworksGroup.id })))
		.execute();

	const databases = [
		'PostgreSQL',
		'MySQL',
		'SQLite',
		'MongoDB',
		'Redis',
		'Elasticsearch',
		'Firestore',
		'MariaDB',
		'Cassandra',
		'DynamoDB',
		'Neo4j',
	];
	await db
		.insert(technologies)
		.values(databases.map((name) => ({ name, groupId: databasesGroup.id })))
		.execute();

	const developerTools = [
		'Webpack',
		'Babel',
		'ESLint',
		'Prettier',
		'Vite',
		'Parcel',
		'Turbopack',
		'Turborepo',
	];
	await db
		.insert(technologies)
		.values(developerTools.map((name) => ({ name, groupId: developerToolsGroup.id })))
		.execute();

	const infra = ['Docker', 'Kubernetes', 'Jenkins', 'Travis CI', 'CircleCI', 'Github Actions'];
	await db
		.insert(technologies)
		.values(infra.map((name) => ({ name, groupId: infraGroup.id })))
		.execute();

	const services = ['Stripe', 'Twilio', 'SendGrid', 'Firebase', 'Auth0'];
	await db
		.insert(technologies)
		.values(services.map((name) => ({ name, groupId: servicesGroup.id })))
		.execute();

	const clouds = ['AWS', 'Google Cloud', 'Azure', 'DigitalOcean', 'Heroku', 'Vercel', 'Netlify'];
	await db
		.insert(technologies)
		.values(clouds.map((name) => ({ name, groupId: cloudsGroup.id })))
		.execute();

	console.log('Successfully inserted technologies');
}

async function insertProjects(owner: User) {
	const newProjects = await db
		.insert(projects)
		.values([
			{
				name: 'Project Management Tool',
				slug: projectsService.generateProjectSlug('Project Management Tool'),
				shortDescription: 'A web application to manage projects and tasks.',
				longDescription:
					'A full-featured project management tool that allows teams to collaborate, track progress, and manage tasks efficiently.',
				status: 'In Progress',
				teamPositions: [
					'Frontend',
					'Backend',
					'Fullstack',
					'Devops',
					'QA',
					'Product Manager',
				],
				ownerId: owner.id,
			},
			{
				name: 'E-commerce Platform',
				slug: projectsService.generateProjectSlug('E-commerce Platform'),
				shortDescription: 'An online platform for buying and selling products.',
				longDescription:
					'An e-commerce platform that supports product listings, shopping carts, payment processing, and order management.',
				status: 'Created',
				teamPositions: [
					'Frontend',
					'Backend',
					'Fullstack',
					'Devops',
					'QA',
					'Product Manager',
				],
				ownerId: owner.id,
			},
			{
				name: 'TaskFlow - Team Productivity App',
				slug: projectsService.generateProjectSlug('TaskFlow - Team Productivity App'),
				shortDescription: 'A web app for managing tasks and tracking productivity.',
				longDescription:
					'TaskFlow helps distributed teams organize projects, assign tasks, and track progress in real time. The app includes integrations with Slack and GitHub.',
				status: 'In Progress',
				teamPositions: [
					'Frontend',
					'Backend',
					'Fullstack',
					'QA',
					'Product Manager',
					'UX Developer',
				],
				ownerId: owner.id,
			},
			{
				name: 'CodeCollab - Online IDE',
				slug: projectsService.generateProjectSlug('CodeCollab - Online IDE'),
				shortDescription: 'Browser-based collaborative coding environment.',
				longDescription:
					'CodeCollab allows developers to work together in real time, share terminals, and run code in isolated Docker containers.',
				status: 'Created',
				teamPositions: ['Frontend', 'Backend', 'Devops', 'QA'],
				ownerId: owner.id,
			},
			{
				name: 'MediTrack - Healthcare Management',
				slug: projectsService.generateProjectSlug('MediTrack - Healthcare Management'),
				shortDescription: 'A platform for tracking patient health records securely.',
				longDescription:
					'MediTrack provides doctors and patients with an encrypted platform to manage appointments, prescriptions, and test results, with role-based access control.',
				status: 'Finished',
				teamPositions: ['Fullstack', 'QA', 'Product Manager', 'UI Developer'],
				ownerId: owner.id,
			},
			{
				name: 'EduStream - Online Learning Platform',
				slug: projectsService.generateProjectSlug('EduStream - Online Learning Platform'),
				shortDescription: 'Stream and host interactive educational courses.',
				longDescription:
					'EduStream enables instructors to create video courses, add interactive quizzes, and track learner progress. Includes live video sessions.',
				status: 'In Progress',
				teamPositions: ['Frontend', 'Backend', 'Devops', 'QA', 'UX Developer'],
				ownerId: owner.id,
			},
			{
				name: 'FitTrack - Fitness Tracking App',
				slug: projectsService.generateProjectSlug('FitTrack - Fitness Tracking App'),
				shortDescription: 'Mobile-first fitness and nutrition tracker.',
				longDescription:
					'FitTrack helps users set workout plans, track nutrition, and monitor progress with wearables. Includes a community leaderboard.',
				status: 'Created',
				teamPositions: ['Frontend', 'Backend', 'UI Developer'],
				ownerId: owner.id,
			},
			{
				name: 'ShopSmart - E-commerce Platform',
				slug: projectsService.generateProjectSlug('ShopSmart - E-commerce Platform'),
				shortDescription: 'A scalable platform for online shops.',
				longDescription:
					'ShopSmart allows small businesses to quickly set up online stores with customizable themes, integrated payments, and analytics dashboards.',
				status: 'In Progress',
				teamPositions: ['Frontend', 'Backend', 'Devops', 'Product Manager', 'UX Developer'],
				ownerId: owner.id,
			},
			{
				name: 'FinGuard - Personal Finance Tracker',
				slug: projectsService.generateProjectSlug('FinGuard - Personal Finance Tracker'),
				shortDescription: 'A finance app for budgeting and expense tracking.',
				longDescription:
					'FinGuard offers AI-powered budgeting, automatic expense categorization, and personalized saving tips.',
				status: 'Created',
				teamPositions: ['Fullstack', 'QA', 'UI Developer'],
				ownerId: owner.id,
			},
			{
				name: 'GreenFleet - Logistics Optimization',
				slug: projectsService.generateProjectSlug('GreenFleet - Logistics Optimization'),
				shortDescription: 'Optimize delivery routes for logistics companies.',
				longDescription:
					'GreenFleet reduces fuel consumption and delivery times using AI route optimization, traffic prediction, and live fleet monitoring.',
				status: 'In Progress',
				teamPositions: ['Backend', 'Devops', 'Product Manager', 'QA'],
				ownerId: owner.id,
			},
			{
				name: 'Artify - AI Image Generator',
				slug: projectsService.generateProjectSlug('Artify - AI Image Generator'),
				shortDescription: 'Create AI-generated artwork in seconds.',
				longDescription:
					'Artify lets users generate unique digital art with AI, fine-tune styles, and share on social media. Supports NFT minting.',
				status: 'Created',
				teamPositions: ['Frontend', 'Backend', 'UI Developer', 'UX Developer'],
				ownerId: owner.id,
			},
			{
				name: 'StreamPulse - Music Streaming Service',
				slug: projectsService.generateProjectSlug('StreamPulse - Music Streaming Service'),
				shortDescription: 'Personalized music streaming app.',
				longDescription:
					'StreamPulse offers high-quality streaming, playlist collaboration, and AI-generated recommendations. Offline mode supported.',
				status: 'Aborted',
				teamPositions: ['Frontend', 'Backend', 'Devops', 'QA'],
				ownerId: owner.id,
			},
		])
		.returning();

	console.log('Successfully inserted projects');

	return newProjects;
}

async function addTechnologiesToProjects(projects: Project[]) {
	const [
		react,
		typescript,
		nodejs,
		vite,
		express,
		postgres,
		docker,
		aws,
		rust,
		mongodb,
		stripe,
		googleCloud,
		kubernetes,
		reactNative,
		redis,
		python,
		django,
		angular,
		java,
		mysql,
	] = await Promise.all([
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'React'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'TypeScript'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'Node.js'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'Vite'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'Express.js'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'PostgreSQL'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'Docker'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'AWS'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'Rust'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'MongoDB'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'Stripe'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'Google Cloud'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'Kubernetes'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'React Native'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'Redis'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'Python'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'Django'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'Angular'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'Java'),
		}),
		await db.query.technologies.findFirst({
			where: (tech) => eq(tech.name, 'MySQL'),
		}),
	]);

	await db.insert(projectsToTechnologies).values([
		{
			projectId: projects[0].id,
			technologyId: react!.id,
		},
		{
			projectId: projects[0].id,
			technologyId: typescript!.id,
		},
		{
			projectId: projects[0].id,
			technologyId: nodejs!.id,
		},
		{
			projectId: projects[0].id,
			technologyId: vite!.id,
		},
		{
			projectId: projects[0].id,
			technologyId: express!.id,
		},
		{
			projectId: projects[0].id,
			technologyId: postgres!.id,
		},
		{
			projectId: projects[0].id,
			technologyId: docker!.id,
		},
		{
			projectId: projects[0].id,
			technologyId: aws!.id,
		},
		{
			projectId: projects[1].id,
			technologyId: rust!.id,
		},
		{
			projectId: projects[1].id,
			technologyId: mongodb!.id,
		},
		{
			projectId: projects[1].id,
			technologyId: stripe!.id,
		},
		{
			projectId: projects[1].id,
			technologyId: docker!.id,
		},
		{
			projectId: projects[1].id,
			technologyId: googleCloud!.id,
		},
		{
			projectId: projects[2].id,
			technologyId: react!.id,
		},
		{
			projectId: projects[2].id,
			technologyId: postgres!.id,
		},
		{
			projectId: projects[2].id,
			technologyId: docker!.id,
		},
		{
			projectId: projects[3].id,
			technologyId: typescript!.id,
		},
		{
			projectId: projects[3].id,
			technologyId: docker!.id,
		},
		{
			projectId: projects[3].id,
			technologyId: kubernetes!.id,
		},
		{
			projectId: projects[3].id,
			technologyId: nodejs!.id,
		},
		{
			projectId: projects[3].id,
			technologyId: aws!.id,
		},
		{
			projectId: projects[4].id,
			technologyId: reactNative!.id,
		},
		{
			projectId: projects[4].id,
			technologyId: python!.id,
		},
		{
			projectId: projects[4].id,
			technologyId: postgres!.id,
		},
		{
			projectId: projects[5].id,
			technologyId: mongodb!.id,
		},
		{
			projectId: projects[5].id,
			technologyId: redis!.id,
		},
		{
			projectId: projects[5].id,
			technologyId: docker!.id,
		},
		{
			projectId: projects[6].id,
			technologyId: googleCloud!.id,
		},
		{
			projectId: projects[6].id,
			technologyId: angular!.id,
		},
		{
			projectId: projects[6].id,
			technologyId: java!.id,
		},
		{
			projectId: projects[6].id,
			technologyId: mysql!.id,
		},
		{
			projectId: projects[6].id,
			technologyId: python!.id,
		},
		{
			projectId: projects[6].id,
			technologyId: django!.id,
		},
		{
			projectId: projects[6].id,
			technologyId: aws!.id,
		},
	]);

	console.log('Successfully added technologies to projects');
}

async function addProjectLinks(projects: Project[]) {
	await db.insert(projectLinks).values([
		{
			projectId: projects[0].id,
			projectLink: 'https://project-management.example.com',
			sourceControlType: 'Github',
			sourceControlLink: 'https://www.github.com',
			chatType: 'Slack',
			chatLink: 'https://www.slack.com',
			projectManagementType: 'Jira',
			projectManagementLink: 'https://www.atlassian.com/software/jira',
		},
		{
			projectId: projects[1].id,
			projectLink: 'https://project-management.example.com',
			sourceControlType: 'Gitlab',
			sourceControlLink: 'https://www.gitlab.com',
			chatType: 'Discord',
			chatLink: 'https://www.discord.com',
			projectManagementType: 'Trello',
			projectManagementLink: 'https://www.trello.com',
		},
		{
			projectId: projects[2].id,
			projectLink: 'https://project-management.example.com',
			sourceControlType: 'Gitlab',
			sourceControlLink: 'https://www.gitlab.com',
			chatType: 'Discord',
			chatLink: 'https://www.discord.com',
			projectManagementType: 'Trello',
			projectManagementLink: 'https://www.trello.com',
		},
		{
			projectId: projects[3].id,
			projectLink: 'https://project-management.example.com',
			sourceControlType: 'Gitlab',
			sourceControlLink: 'https://www.gitlab.com',
			chatType: 'Discord',
			chatLink: 'https://www.discord.com',
			projectManagementType: 'Trello',
			projectManagementLink: 'https://www.trello.com',
		},
		{
			projectId: projects[4].id,
			projectLink: 'https://project-management.example.com',
			sourceControlType: 'Gitlab',
			sourceControlLink: 'https://www.gitlab.com',
			chatType: 'Discord',
			chatLink: 'https://www.discord.com',
			projectManagementType: 'Trello',
			projectManagementLink: 'https://www.trello.com',
		},
		{
			projectId: projects[5].id,
			projectLink: 'https://project-management.example.com',
			sourceControlType: 'Gitlab',
			sourceControlLink: 'https://www.gitlab.com',
			chatType: 'Discord',
			chatLink: 'https://www.discord.com',
			projectManagementType: 'Trello',
			projectManagementLink: 'https://www.trello.com',
		},
		{
			projectId: projects[6].id,
			projectLink: 'https://project-management.example.com',
			sourceControlType: 'Gitlab',
			sourceControlLink: 'https://www.gitlab.com',
			chatType: 'Discord',
			chatLink: 'https://www.discord.com',
			projectManagementType: 'Trello',
			projectManagementLink: 'https://www.trello.com',
		},
		{
			projectId: projects[7].id,
			projectLink: 'https://project-management.example.com',
			sourceControlType: 'Gitlab',
			sourceControlLink: 'https://www.gitlab.com',
			chatType: 'Discord',
			chatLink: 'https://www.discord.com',
			projectManagementType: 'Trello',
			projectManagementLink: 'https://www.trello.com',
		},
		{
			projectId: projects[8].id,
			projectLink: 'https://project-management.example.com',
			sourceControlType: 'Gitlab',
			sourceControlLink: 'https://www.gitlab.com',
			chatType: 'Discord',
			chatLink: 'https://www.discord.com',
			projectManagementType: 'Trello',
			projectManagementLink: 'https://www.trello.com',
		},
		{
			projectId: projects[9].id,
			projectLink: 'https://project-management.example.com',
			sourceControlType: 'Gitlab',
			sourceControlLink: 'https://www.gitlab.com',
			chatType: 'Discord',
			chatLink: 'https://www.discord.com',
			projectManagementType: 'Trello',
			projectManagementLink: 'https://www.trello.com',
		},
		{
			projectId: projects[10].id,
			projectLink: 'https://project-management.example.com',
			sourceControlType: 'Gitlab',
			sourceControlLink: 'https://www.gitlab.com',
			chatType: 'Discord',
			chatLink: 'https://www.discord.com',
			projectManagementType: 'Trello',
			projectManagementLink: 'https://www.trello.com',
		},
	]);
	console.log('Successfully added links to projects');
}

seed()
	.then(() => {
		console.log('Database is seeded');
	})
	.catch((error) => {
		console.error('Failed to seed database: ', error);
	});
