import { siteConfig } from 'config/site'
import type { Metadata } from 'next'

export const config = {
	title: 'AI CLI (OpenAI) 🤖',
	description:
		"A command-line interface (CLI) for interacting with an AI model using OpenAI's API. This CLI allows users to engage in text-based conversations with the AI model and receive responses in real-time.",
	slug: 'ai-cli',
	publishedAt: '2024-05-12',
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
