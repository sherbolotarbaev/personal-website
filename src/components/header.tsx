'use client'

import type React from 'react'

import Link from 'next/link'
import SectionBadge, { StarIcon } from './ui/section-badge'

import { siteConfig } from 'config/site'
import { AnimatedTextCycle } from './ui/animated-text-cycle'

export const Header: React.FC = () => {
	return (
		<header className='mb-6 flex flex-col gap-1'>
			<SectionBadge
				className='mb-2 -ml-0.5 w-fit'
				text='Open to New Opportunities'
				icon={<StarIcon fill='fill-[hsl(var(--primary-gradient-start))]' />}
			/>
			<Link href='/' className='font-medium text-xl text-black dark:text-white'>
				{siteConfig.title}{' '}
			</Link>
			{/* <p className='text-zinc-600 dark:text-zinc-500'>
				Sr. Software Engineer at @{' '}
				<LinkPreview url='https://www.peopleup.ai'>PeopleUp</LinkPreview>
			</p> */}

			<AnimatedTextCycle
				className='text-zinc-600 dark:text-zinc-500'
				words={[
					'Senior Software Engineer @ PeopleUp',
					'Full Stack Developer & Systems Architect',
					'TypeScript, Node.js, Deno 2.0, Rust',
				]}
			/>
		</header>
	)
}
