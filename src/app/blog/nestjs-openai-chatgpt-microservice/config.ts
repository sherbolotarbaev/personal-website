import { siteConfig } from 'config/site'
import type { Metadata } from 'next'

export const config = {
	title: 'Building a Nest.js Microservice for OpenAI and ChatGPT Integration',
	description:
		'In the rapidly evolving landscape of AI and full-stack development, the seamless integration of powerful tools like OpenAI’s ChatGPT can open up a realm of possibilities. In this comprehensive guide, we will delve into the process of building a Nest.js microservice to effortlessly incorporate the capabilities of OpenAI, creating a robust and scalable solution.',
	slug: 'nestjs-openai-chatgpt-microservice',
	publishedAt: '2023-11-30',
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
