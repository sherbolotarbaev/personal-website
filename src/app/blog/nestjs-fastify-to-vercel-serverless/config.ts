import { siteConfig } from 'config/site'
import type { Metadata } from 'next'

export const config = {
	title: 'Converting a NestJS Fastify App to Vercel Serverless',
	description:
		'Learn how to transform your NestJS Fastify application into a serverless function deployable on Vercel. This guide walks you through the process step-by-step, ensuring a smooth transition to a scalable, serverless architecture.',
	slug: 'nestjs-fastify-to-vercel-serverless',
	publishedAt: '2024-09-30',
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
