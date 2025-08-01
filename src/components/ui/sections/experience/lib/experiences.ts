export type TPosition = {
	title: string
	period: {
		startDate: string | string
		endDate: string | 'Present'
		duration?: string
	}
	type?: 'part-time' | 'full-time' | 'internship' | 'freelance'
	description?: string
	covers?: string[]
	skills?: string[]
}

export type TExperience = {
	company: string
	duration: {
		startDate: string
		endDate: string | 'Present'
		totalDuration?: string
	}
	location: string
	type?: 'remote' | 'on-site' | 'hybrid'
	positions: TPosition[]
	url: string
}

export const experiences: TExperience[] = [
	{
		company: 'PeopleUp',
		type: 'remote',
		duration: {
			startDate: '2025-06-01',
			endDate: 'Present',
		},
		location: 'San Francisco, United States',
		url: 'https://www.peopleup.ai',
		positions: [
			{
				title: 'Senior Software Engineer',
				period: {
					startDate: '2025-06-01',
					endDate: 'Present',
				},
				type: 'full-time',
			},
		],
	},
	{
		company: 'WEDEVX',
		type: 'remote',
		duration: {
			startDate: '2023-06-01',
			endDate: '2025-06-01',
		},
		location: 'Chicago, United States',
		url: 'https://www.wedevx.co',
		positions: [
			{
				title: 'Lead Software Development Engineer',
				period: {
					startDate: '2025-02-01',
					endDate: '2025-06-01',
				},
				type: 'full-time',
			},
			{
				title: 'Software Development Engineer II',
				period: {
					startDate: '2024-02-01',
					endDate: '2025-06-01',
				},
				description: `Led development of NestJS microservices, increasing system performance by 99% through batching and Prisma optimizations. Improved query efficiency by refining system architecture, reducing database processing time from 7 minutes to 7 seconds.
				
				<br/><br/>
				
				(WEDEVX AI) Built an AI assistant that helps solve exercises, tracks progress, and provides personalized support.
				
				<br/><br/>

				Contributed to the development of an AI recruitment engine to source, vet, and hire top engineering talent using AI-driven job simulations, streamlining recruitment processes.`,
				covers: ['/images/wedevx.png', '/images/wedevx-4.png'],
				skills: [
					'Systems Design',
					'Code Review',
					'Nest.js',
					'Microservices',
					'Leadership',
					'Docker',
					'Kubernetes',
					'Amazon Web Services (AWS)',
					'Prisma ORM',
				],
				type: 'full-time',
			},
			{
				title: 'Software Development Engineer',
				period: {
					startDate: '2023-06-01',
					endDate: '2024-02-01',
				},
				description: `At WEDEVX, I played a key role in architecting and optimizing backend systems for a tech-focused educational platform, designed to empower individuals with the skills to secure high-paying tech jobs. 

				<br/><br/>
				
				Engineered backend systems with NestJS, Fastify, and PostgreSQL, achieving a 38% performance boost. Integrated AWS services, enhancing security and scalability. Implemented quizzes generating 800+ leads, driving user engagement.`,
				covers: ['/images/wedevx-2.png', '/images/wedevx-3.png'],
				skills: [
					'Problem Solving',
					'PostgreSQL',
					'Supabase',
					'Typescript',
					'API Design',
					'Fastify',
					'Nest.js',
					'Docker',
					'Amazon S3',
					'Code Review',
				],
				type: 'full-time',
			},
		],
	},
	{
		company: 'Mancho',
		type: 'on-site',
		duration: {
			startDate: '2021-05-01',
			endDate: '2023-05-01',
		},
		location: 'Bishkek, Kyrgyzstan',
		url: 'https://www.mancho.dev',
		positions: [
			{
				title: 'NodeJS Backend Developer',
				period: {
					startDate: '2022-09-01',
					endDate: '2023-05-01',
				},
				description: `Developed scalable Node.js backend services and RESTful APIs, optimizing performance and ensuring reliable database integration.`,
				covers: ['/images/mancho-2.png'],
				skills: [
					'Node.js',
					'Express.js',
					'MongoDB',
					'Amazon Dynamodb',
					'Elasticsearch',
					'Amazon Web Services (AWS)',
					'Docker',
					'Amazon S3',
				],
				type: 'full-time',
			},
			{
				title: 'Frontend Developer',
				period: {
					startDate: '2021-08-01',
					endDate: '2022-09-01',
				},
				description: `Optimized cross-platform websites with React, Next.js, and TypeScript, improving performance by 40%. Applied caching strategies to reduce page load times.`,
				covers: ['/images/mancho.png'],
				skills: ['React', 'Next.js', 'Redux', 'TypeScript'],
				type: 'full-time',
			},
			{
				title: 'Intern Frontend Developer',
				period: {
					startDate: '2021-05-01',
					endDate: '2021-08-01',
				},
				description: `Assisted in frontend development with React and JavaScript, gaining hands-on experience with modern practices.`,
				skills: ['TypeScript', 'React', 'SASS'],
				type: 'internship',
			},
		],
	},
]

const calculateDuration = (startDate: Date, endDate: Date) => {
	let years = endDate.getFullYear() - startDate.getFullYear()
	let months = endDate.getMonth() - startDate.getMonth()

	if (months < 0) {
		years--
		months += 12
	}

	return { years, months }
}

const formatDuration = ({
	years,
	months,
}: {
	years: number
	months: number
}) => {
	const yearsStr = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : ''
	const monthsStr = months > 0 ? `${months} mo${months > 1 ? 's' : ''}` : ''
	return `${yearsStr} ${monthsStr}`.trim()
}

const formatDate = (date: Date | 'Present') => {
	if (date === 'Present') return 'Present'
	return date.toLocaleString('default', { month: 'short', year: 'numeric' })
}

export const formatExperiences = (experiences: TExperience[]) => {
	return experiences.map(experience => {
		const updatedPositions = experience.positions.map(position => {
			const startDate = new Date(position.period.startDate)
			const endDate =
				position.period.endDate === 'Present'
					? 'Present'
					: new Date(position.period.endDate)
			const duration = calculateDuration(
				new Date(startDate),
				endDate === 'Present' ? new Date() : endDate
			)

			return {
				...position,
				period: {
					startDate: formatDate(startDate),
					endDate: formatDate(endDate),
					duration: formatDuration(duration),
				},
			}
		})

		const startDate = new Date(experience.duration.startDate)
		const endDate =
			experience.duration.endDate === 'Present'
				? 'Present'
				: new Date(experience.duration.endDate)
		const totalDuration = calculateDuration(
			startDate,
			endDate === 'Present' ? new Date() : endDate
		)

		return {
			...experience,
			duration: {
				startDate: formatDate(startDate),
				endDate: formatDate(endDate),
				totalDuration: formatDuration(totalDuration),
			},
			positions: updatedPositions,
		}
	})
}
