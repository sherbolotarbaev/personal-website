import { siteConfig } from 'config/site'
import type { Metadata } from 'next'

export const config = {
	title: 'Generate SQL Migration Scripts with Prisma',
	description:
		'Learn how to create SQL migration scripts using Prisma by pulling database schemas and generating diff scripts between different schema states.',
	slug: 'prisma-sql-migration',
	publishedAt: '2025-03-17',
	author: 'Sher Arbaev',
}

export const metadata: Metadata = {
	title: config.title,
	description: config.description,
	alternates: { canonical: `/blog/${config.slug}` },
	openGraph: {
		title: config.title,
		description: config.description,
		type: 'article',
		publishedTime: config.publishedAt,
		url: `${siteConfig.url}/blog/${config.slug}`,
		// images: [
		// 	{
		// 		url: './og.jpg',
		// 	},
		// ],
	},
}

export const script = {
	'@context': 'https://schema.org',
	'@type': 'BlogPosting',
	headline: config.title,
	datePublished: config.publishedAt,
	dateModified: config.publishedAt,
	description: config.description,
	image: `${siteConfig.url}/og?title=${config.title}`,
	url: `${siteConfig.url}/blog/${config.slug}`,
	author: {
		'@type': 'Person',
		name: config.author,
	},
}
