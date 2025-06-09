'use client'

import type React from 'react'

import Link from 'next/link'
import LinkPreview from './ui/link-preview'

import { siteConfig } from 'config/site'

export const Header: React.FC = () => {
	return (
		<header className='mb-6 flex items-center justify-between'>
			<div className='flex flex-col gap-1.5'>
				<Link
					href='/'
					className='font-medium text-xl text-black dark:text-white'
				>
					{siteConfig.title}{' '}
				</Link>

				<span className='text-zinc-600 dark:text-zinc-500 text-xs -ml-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full px-1.5 py-0.5 w-fit'>
					@sherbolotarbaev
				</span>

				<div className='text-sm sm:text-base text-zinc-600 dark:text-zinc-500'>
					Sr. Software Engineer at @{' '}
					<LinkPreview url='https://www.peopleup.ai'>PeopleUp</LinkPreview>
				</div>
			</div>
		</header>
	)
}
