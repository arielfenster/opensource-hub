import { db } from '../db';
import { technologies, technologyGroups } from '../schemas';

async function seed() {
	await insertTechnologies();
}

async function insertTechnologies() {
	const groups = await db
		.insert(technologyGroups)
		.values([
			{ name: 'languages' },
			{ name: 'frameworks' },
			{ name: 'databases' },
			{ name: 'tools' },
			{ name: 'clouds' },
		])
		.returning();

	const [languagesGroup, frameworksGroup, databasesGroup, toolsGroup, cloudsGroup] = groups;

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
		.returning();

	const frameworks = [
		'Express.js',
		'Node.js',
		'Nest.js',
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
		'Nuxt.js',
		'Phoenix',
		'Remix',
		'Ionic',
		'React Native',
		'Astro',
		'Flutter',
		'Svelte',
		'Svelte Kit',
		'Rocket',
	];
	await db
		.insert(technologies)
		.values(frameworks.map((name) => ({ name, groupId: frameworksGroup.id })))
		.returning();

	const databases = [
		'PostgreSQL',
		'MySQL',
		'SQLite',
		'MongoDB',
		'Redis',
		'Elasticsearch',
		'Firebase',
		'MariaDB',
		'Cassandra',
		'DynamoDB',
		'Neo4j',
		'InfluxDB',
	];
	await db
		.insert(technologies)
		.values(databases.map((name) => ({ name, groupId: databasesGroup.id })))
		.returning();

	const tools = [
		'Docker',
		'Kubernetes',
		'Jenkins',
		'Travis CI',
		'CircleCI',
		'Webpack',
		'Babel',
		'ESLint',
		'Prettier',
		'Tailwind CSS',
		'Vite',
		'Parcel',
	];
	await db
		.insert(technologies)
		.values(tools.map((name) => ({ name, groupId: toolsGroup.id })))
		.returning();

	const clouds = ['AWS', 'Google Cloud', 'Azure', 'DigitalOcean', 'Heroku', 'Vercel', 'Netlify'];
	await db
		.insert(technologies)
		.values(clouds.map((name) => ({ name, groupId: cloudsGroup.id })))
		.returning();

	console.log('Successfully inserted technologies');
}

seed()
	.then(() => {
		console.log('Database is seeded');
	})
	.catch((error) => {
		console.error('Failed to seed database: ', error);
	});
