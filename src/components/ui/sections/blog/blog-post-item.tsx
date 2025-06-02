'use client'

import type { BlogPost } from 'lib/blog'
import { motion, useInView } from 'motion/react'
import type React from 'react'
import { useRef } from 'react'

export const BlogPostItem: React.FC<BlogPost> = ({ title, description }) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5 }}
		>
			<div className='flex flex-col gap-1'>
				<h4 className='font-normal dark:text-zinc-100'>{title}</h4>
				<p className='text-zinc-500 dark:text-zinc-400 line-clamp-1'>
					{description}
				</p>
			</div>
		</motion.div>
	)
}
