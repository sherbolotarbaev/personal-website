'use client'

import type React from 'react'

import Link from 'next/link'
import LinkPreview from './ui/link-preview'

import { siteConfig } from 'config/site'

export const Header: React.FC = () => {
	return (
		<header className='mb-8 flex items-center justify-between'>
			<div>
				<Link
					href='/'
					className='font-medium text-lg text-black dark:text-white'
				>
					{siteConfig.title}
				</Link>
				<div className='text-sm sm:text-base text-zinc-600 dark:text-zinc-500'>
					Software Engineer at @{' '}
					<LinkPreview url='https://www.wedevx.co'>WEDEVX</LinkPreview>
				</div>
			</div>
		</header>
	)
}
