import { siteConfig } from 'config/site'
import type { Metadata } from 'next'

export const config = {
	title: 'Building a REST API with NestJS and Prisma',
	description:
		'In this tutorial, you will learn how to build the backend REST API for a blog application called "Median" (a simple Medium clone). You will get started by creating a new NestJS project. Then you will start your own PostgreSQL server and connect to it using Prisma. Finally, you will build the REST API and document it with Swagger.',
	slug: 'simple-medium-clone-api',
	publishedAt: '2024-07-24',
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
