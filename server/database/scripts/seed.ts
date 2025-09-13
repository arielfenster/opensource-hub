import { passwordService } from '$/server/modules/auth/password.service';
import { technologyGroupNames } from '$/shared/types/technologies';
import { db } from '../db';
import { technologies, technologyGroups, users } from '../schemas';

async function seed() {
	await insertUsers();
	await insertTechnologies();
}

async function insertUsers() {
	const password = await passwordService.hashPassword('arielfenster');
	await db
		.insert(users)
		.values({
			firstName: 'Ariel',
			lastName: 'Test',
			email: 'ariel@gmail.com',
			password: password,
			role: 'Admin',
		})
		.execute();

	console.log('Successfully inserted users');
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

seed()
	.then(() => {
		console.log('Database is seeded');
	})
	.catch((error) => {
		console.error('Failed to seed database: ', error);
	});
