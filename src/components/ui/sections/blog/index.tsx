import type React from 'react'

import Link from 'next/link'
import SectionWrapper from 'shared/ui/section.wrapper'
import { AnimatedBackground } from 'ui/animated-background'
import { Heading3 } from 'ui/sections/heading'
import { BlogPostItem } from './blog-post-item'

import { getBlogPosts } from 'lib/blog'

const Blog: React.FC = async () => {
	const blogPosts = await getBlogPosts()

	return (
		<SectionWrapper>
			<Heading3>Blog</Heading3>
			<div className='flex flex-col'>
				<AnimatedBackground
					enableHover
					className='h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80'
					transition={{
						type: 'spring',
						bounce: 0,
						duration: 0.2,
					}}
				>
					{blogPosts.map(post => (
						<Link
							key={post.uid}
							href={post.link}
							className='-mx-3 rounded-xl p-3'
							data-id={post.uid}
						>
							<BlogPostItem {...post} />
						</Link>
					))}
				</AnimatedBackground>
			</div>
		</SectionWrapper>
	)
}

export default Blog
