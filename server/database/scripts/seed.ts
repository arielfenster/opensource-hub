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
} from '../schemas';

async function seed() {
	const user = await insertUsers();
	await insertTechnologies();
	await insertProjects(user);
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
	const [projectA, projectB] = await db
		.insert(projects)
		.values([
			{
				name: 'Project Management Tool',
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
		])
		.returning();

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
	]);

	await db.insert(projectsToTechnologies).values([
		{
			projectId: projectA.id,
			technologyId: react!.id,
		},
		{
			projectId: projectA.id,
			technologyId: typescript!.id,
		},
		{
			projectId: projectA.id,
			technologyId: nodejs!.id,
		},
		{
			projectId: projectA.id,
			technologyId: vite!.id,
		},
		{
			projectId: projectA.id,
			technologyId: express!.id,
		},
		{
			projectId: projectA.id,
			technologyId: postgres!.id,
		},
		{
			projectId: projectA.id,
			technologyId: docker!.id,
		},
		{
			projectId: projectA.id,
			technologyId: aws!.id,
		},
		{
			projectId: projectB.id,
			technologyId: rust!.id,
		},
		{
			projectId: projectB.id,
			technologyId: mongodb!.id,
		},
		{
			projectId: projectB.id,
			technologyId: stripe!.id,
		},
		{
			projectId: projectB.id,
			technologyId: docker!.id,
		},
		{
			projectId: projectB.id,
			technologyId: googleCloud!.id,
		},
	]);

	console.log('Successfully inserted projects');
}

seed()
	.then(() => {
		console.log('Database is seeded');
	})
	.catch((error) => {
		console.error('Failed to seed database: ', error);
	});
