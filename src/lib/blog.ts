import fs from 'fs'
import path from 'path'

export type BlogPost = {
	title: string
	description: string
	link: string
	uid: string
	publishedAt: string
	slug: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
	const blogDir = path.join(process.cwd(), 'src/app/blog')

	try {
		const entries = fs.readdirSync(blogDir, { withFileTypes: true })
		const blogDirs = entries
			.filter(entry => entry.isDirectory())
			.map(entry => entry.name)

		const blogPosts: BlogPost[] = []

		for (const dir of blogDirs) {
			const configPath = path.join(blogDir, dir, 'config.ts')

			try {
				// Check if config.ts exists
				if (fs.existsSync(configPath)) {
					// Dynamically import the config using relative module path
					const configModule = await import(`../app/blog/${dir}/config`)
					const config = configModule.config

					if (config) {
						blogPosts.push({
							title: config.title,
							description: config.description,
							link: `/blog/${config.slug}`,
							uid: `blog-${config.slug}`,
							publishedAt: config.publishedAt,
							slug: config.slug,
						})
					}
				}
			} catch (error) {
				console.warn(`Failed to load config for blog post: ${dir}`, error)
			}
		}

		// Sort by published date (newest first)
		return blogPosts.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
		)
	} catch (error) {
		console.error('Failed to read blog directory:', error)
		return []
	}
}
