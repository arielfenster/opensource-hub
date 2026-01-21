import { passwordService } from '$/server/modules/auth/password.service';
import { technologyGroupNameValues } from '$/shared/types/technologies';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import {
	projects,
	technologies,
	technologyGroups,
	users,
	projectsToTechnologies,
	projectLinks,
	technologyRequests,
} from '../schemas';
import { projectsService } from '$/server/modules/projects/projects.service';
import type { User } from '$/shared/types/users';
import type { Project } from '$/shared/types/projects';

async function seed() {
	const user = await insertUsers();
	await insertTechnologies();
	const projects = await insertProjects(user);
	await addTechnologiesToProjects(projects);
	await addProjectLinks(projects);
	await addTechnologyRequests(user);
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
		.values(technologyGroupNameValues.map((name) => ({ name })))
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
				ownerId: owner.id,
			},
			{
				name: 'E-commerce Platform',
				slug: projectsService.generateProjectSlug('E-commerce Platform'),
				shortDescription: 'An online platform for buying and selling products.',
				longDescription:
					'An e-commerce platform that supports product listings, shopping carts, payment processing, and order management.',
				status: 'Created',
				teamPositions: [],
				ownerId: owner.id,
			},
			{
				name: 'TaskFlow - Team Productivity App',
				slug: projectsService.generateProjectSlug('TaskFlow - Team Productivity App'),
				shortDescription:
					'A collaborative productivity platform for modern teams.\nManage tasks, assign responsibilities, and track progress in real time.\nStay organized with smart notifications and integrations.\nIdeal for startups and remote teams.',
				longDescription:
					'TaskFlow is a complete task and project management platform built to help distributed teams stay aligned. It allows users to create projects, assign tasks, track deadlines, and monitor team performance with visual dashboards.\n\nThe app integrates with Slack, GitHub, and Google Calendar, ensuring that updates flow naturally into your team’s daily tools. Managers can monitor workloads while developers and designers stay focused on their priorities.\n\nBuilt with React and Node.js, TaskFlow is optimized for real-time collaboration and designed to scale with growing teams.',
				status: 'In Progress',
				keyFeatures: [
					'Modern React patterns and hooks',
					'Type-safe APIs with TypeScript and Drizzle ORM',
					'Implementing role-based access control (RBAC)',
					'Responsive UI design and dashboard layout techniques',
					'Creating gamified user experiences',
					'Integrating third-party APIs for product data',
				],
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
				shortDescription:
					'Collaborative web IDE for coding together in real time.\nSupports multiple languages and Docker-based sandboxes.\nBuilt for code reviews, education, and remote pairing.\nFast, responsive, and secure.',
				longDescription:
					'CodeCollab is a browser-based development environment that lets teams write and run code together in real time. Each session spins up an isolated container using Docker, allowing developers to safely experiment and share progress instantly.\n\nUsers can open terminals, view file diffs, and even chat inline while editing. The platform supports syntax highlighting for 20+ languages and has built-in GitHub integration.\n\nWith TypeScript on the frontend and a containerized Node.js backend, CodeCollab brings the convenience of VS Code to the browser—without sacrificing performance or security.',
				status: 'Created',
				keyFeatures: [
					'State management in Vue 3 with Composition API',
					'Building clean and accessible UI systems',
				],
				teamPositions: ['Frontend', 'Backend', 'Devops', 'QA'],
				ownerId: owner.id,
			},
			{
				name: 'MediTrack - Healthcare Management',
				slug: projectsService.generateProjectSlug('MediTrack - Healthcare Management'),
				shortDescription:
					'A secure platform for clinics and hospitals.\nManage patient data, appointments, and prescriptions.\nDesigned for compliance and accessibility.\nReliable, encrypted, and easy to use.',
				longDescription:
					'MediTrack is an end-to-end healthcare management platform designed to simplify how clinics manage patient data. From appointment scheduling to medical record storage, everything is handled securely and efficiently.\n\nBuilt with C# and .NET, MediTrack emphasizes compliance with HIPAA and GDPR standards. Doctors can update prescriptions, nurses can monitor vital stats, and patients can view test results through an intuitive dashboard.\n\nThe system is scalable and deployable both on-premise and in the cloud. React provides a clean interface for users, while the backend ensures high performance and reliability for busy medical environments.',
				status: 'Finished',
				keyFeatures: [
					'Using GraphQL for efficient mobile APIs',
					'Offline data synchronization in React Native',
					'Testing mobile apps with Jest and Detox',
					'Data visualization and charting libraries',
				],
				teamPositions: ['Fullstack', 'QA', 'Product Manager', 'UI Developer'],
				ownerId: owner.id,
			},
			{
				name: 'EduStream - Online Learning Platform',
				slug: projectsService.generateProjectSlug('EduStream - Online Learning Platform'),
				shortDescription:
					'Interactive learning system for video-based courses.\nTeachers can create, stream, and grade in one place.\nBuilt for education at scale.\nSmooth, modern, and community-driven.',
				longDescription:
					'EduStream is a full-featured online learning system that enables educators to create and share video-based courses. It provides tools for quizzes, assignments, and progress tracking, helping students stay engaged throughout their learning journey.\n\nThe platform supports both on-demand and live streaming sessions, allowing real-time interaction between instructors and learners. With an adaptive recommendation engine, students discover new courses based on their interests.\n\nPowered by Vue.js, Node.js, and AWS, EduStream delivers smooth performance even under high traffic, making it ideal for universities, training companies, and online schools.',
				status: 'In Progress',
				keyFeatures: [
					'Server-side rendering and static generation with Next.js',
					'Building reusable and themeable UI components',
					'Integrating OAuth providers (GitHub, Google)',
					'Creating user-customizable design templates',
				],
				teamPositions: ['Frontend', 'Backend', 'Devops', 'QA', 'UX Developer'],
				ownerId: owner.id,
			},
			{
				name: 'FitTrack - Fitness Tracking App',
				slug: projectsService.generateProjectSlug('FitTrack - Fitness Tracking App'),
				shortDescription:
					'Personalized fitness and nutrition tracker.\nPlan workouts, log meals, and monitor progress.\nIntegrates with wearables and community challenges.\nSmart, simple, and motivating.',
				longDescription:
					'FitTrack is a modern fitness companion built for individuals who want to track their workouts and nutrition in one place. It lets users set goals, follow custom workout plans, and visualize progress with detailed analytics.\n\nThe app syncs with popular wearables to automatically log steps, calories, and heart rate data. A social leaderboard encourages friendly competition among users.\n\nDeveloped with React Native and FastAPI, FitTrack is designed to deliver smooth performance across iOS and Android while maintaining accurate data synchronization with cloud-based storage.',
				status: 'Created',
				keyFeatures: [
					'Streaming data visualization with D3.js',
					'Containerization and deployment with Docker',
				],
				teamPositions: ['Frontend', 'Backend', 'UI Developer'],
				ownerId: owner.id,
			},
			{
				name: 'ShopSmart - E-commerce Platform',
				slug: projectsService.generateProjectSlug('ShopSmart - E-commerce Platform'),
				shortDescription:
					'Powerful platform for building online stores.\nSupports custom themes, analytics, and integrated payments.\nFlexible for startups or enterprises.\nBuilt for growth.',
				longDescription:
					'ShopSmart is an enterprise-ready e-commerce solution that allows businesses to launch and manage their own online stores quickly. It features customizable storefronts, inventory management, and seamless integrations with Stripe and PayPal.\n\nMerchants can analyze performance with built-in dashboards that track sales, conversion rates, and customer behavior. The platform also includes multi-language and multi-currency support for global audiences.\n\nBuilt with Next.js and NestJS, ShopSmart leverages modern web architecture to deliver fast loading times and excellent scalability using Docker and Redis.',
				status: 'In Progress',
				keyFeatures: [
					'Using WebSockets for real-time communication',
					'Designing scalable monitoring architectures',
					'Creating reactive frontends with SvelteKit',
					'Optimizing REST APIs with Fastify',
					'Collaborative content moderation workflows',
					'Building learning communities and gamification systems',
				],
				teamPositions: ['Frontend', 'Backend', 'Devops', 'Product Manager', 'UX Developer'],
				ownerId: owner.id,
			},
			{
				name: 'FinGuard - Personal Finance Tracker',
				slug: projectsService.generateProjectSlug('FinGuard - Personal Finance Tracker'),
				shortDescription:
					'Smart budgeting and expense management app.\nAutomatically categorizes your spending.\nHelps you save with AI-driven insights.\nBeautiful, private, and intuitive.',
				longDescription:
					'FinGuard helps users take control of their finances by offering a complete view of income, expenses, and savings. The app uses AI to detect spending patterns and generate personalized budgeting tips.\n\nWith bank integration, FinGuard automatically categorizes transactions and provides weekly summaries that help users stay on top of their goals. Data privacy is guaranteed through end-to-end encryption.\n\nThe system combines an Angular frontend with a robust Java Spring Boot backend, running on MySQL for reliable data management.',
				status: 'Created',
				teamPositions: ['Fullstack', 'QA', 'UI Developer'],
				ownerId: owner.id,
			},
			{
				name: 'GreenFleet - Logistics Optimization',
				slug: projectsService.generateProjectSlug('GreenFleet - Logistics Optimization'),
				shortDescription:
					'AI-based route optimization for delivery fleets.\nReduce fuel consumption and delivery times.\nReal-time tracking and analytics.\nBuilt for logistics and sustainability.',
				longDescription:
					'GreenFleet is a logistics optimization system that helps companies manage and monitor their delivery operations efficiently. Using advanced machine learning models, it predicts traffic and suggests optimal routes to minimize fuel usage.\n\nFleet managers can track every vehicle in real time and generate performance reports based on route history and driver behavior. The platform also includes an environmental dashboard that measures carbon footprint reduction.\n\nGreenFleet runs on a Django backend with a React frontend, powered by Kubernetes for scaling and AWS for cloud deployment.',
				status: 'In Progress',
				keyFeatures: [
					'Integrating IoT devices with web services',
					'Real-time event handling with MQTT',
					'Securing APIs and IoT communication channels',
					'Building dashboards for sensor data visualization',
				],
				teamPositions: ['Backend', 'Devops', 'Product Manager', 'QA'],
				ownerId: owner.id,
			},
			{
				name: 'Artify - AI Image Generator',
				slug: projectsService.generateProjectSlug('Artify - AI Image Generator'),
				shortDescription:
					'Generate stunning artwork with artificial intelligence.\nChoose styles, subjects, and refine results.\nExport images instantly.\nCreative, fast, and limitless.',
				longDescription:
					'Artify brings AI creativity to everyone. Users can generate unique digital art pieces by entering prompts, selecting artistic styles, and refining outputs through iterative feedback.\n\nThe platform leverages TensorFlow for neural style transfer and stable diffusion models. Artists and designers can export their creations for print, social media, or NFT minting directly from the dashboard.\n\nWith React and Node.js, Artify delivers smooth performance and real-time rendering feedback, making it both a tool for professionals and an inspiration playground for beginners.',
				status: 'Created',
				keyFeatures: [
					'Implementing video upload and transcoding with FFmpeg',
					'Streaming media securely with HLS',
					'Building comment systems and threaded discussions',
					'Managing scalable file storage with object storage APIs',
					'Data preprocessing and visualization with Pandas',
					'Building AI dashboards with React',
				],
				teamPositions: ['Frontend', 'Backend', 'UI Developer', 'UX Developer'],
				ownerId: owner.id,
			},
			{
				name: 'StreamPulse - Music Streaming Service',
				slug: projectsService.generateProjectSlug('StreamPulse - Music Streaming Service'),
				shortDescription:
					'Personalized streaming with AI-powered playlists.\nCollaborate on shared mixes and listen offline.\nSeamless and high-fidelity music experience.\nBuilt for audiophiles.',
				longDescription:
					'StreamPulse redefines music streaming with personalization at its core. It learns user preferences through listening behavior and creates dynamic playlists that adapt in real time.\n\nUsers can collaborate with friends to build shared playlists, explore trending artists, and enjoy lossless audio quality even on mobile. Offline mode ensures music is always available, regardless of connection.\n\nThe platform runs on Go and PostgreSQL, with React Native powering the mobile experience. Redis caching ensures low-latency streaming and smooth playback transitions.',
				status: 'Aborted',
				keyFeatures: [
					'Deploying ML models via REST APIs',
					'Experimenting with recommendation algorithms',
				],
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
			sourceControlType: 'Gitlab',
			sourceControlLink: 'https://www.gitlab.com',
			chatType: 'Discord',
			chatLink: 'https://www.discord.com',
			projectManagementType: 'Trello',
			projectManagementLink: 'https://www.trello.com',
		},
		{
			projectId: projects[3].id,
			sourceControlType: 'Gitlab',
			sourceControlLink: 'https://www.gitlab.com',
			chatType: 'Discord',
			chatLink: 'https://www.discord.com',
			projectManagementType: 'Trello',
			projectManagementLink: 'https://www.trello.com',
		},
		{
			projectId: projects[4].id,
			sourceControlType: 'Gitlab',
			sourceControlLink: 'https://www.gitlab.com',
			chatType: 'Discord',
			chatLink: 'https://www.discord.com',
			projectManagementType: 'Trello',
			projectManagementLink: 'https://www.trello.com',
		},
		{
			projectId: projects[5].id,
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

async function addTechnologyRequests(requester: User) {
	await db.insert(technologyRequests).values([
		{
			requestedBy: requester.email,
			name: 'GraphQL',
			group: 'services',
		},
		{
			requestedBy: requester.email,
			name: 'Tailwind CSS',
			group: 'frameworks',
		},
		{
			requestedBy: requester.email,
			name: 'Donald Duck',
			group: 'languages',
		},
	]);

	console.log('Successfully inserted technology requests')
}

seed()
	.then(() => {
		console.log('Database is seeded');
		process.exit(0);
	})
	.catch((error) => {
		console.error('Failed to seed database: ', error);
		process.exit(1);
	});
