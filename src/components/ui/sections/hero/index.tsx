'use client'

import type React from 'react'

import SectionWrapper from 'shared/ui/section.wrapper'
import LinkPreview from 'ui/link-preview'

import { links } from './lib/links'

const Hero: React.FC = () => {
	return (
		<SectionWrapper>
			<div className='flex-1'>
				<p className='text-zinc-600 dark:text-zinc-300'>
					I&apos;m a software engineer 🇰🇬, problem solver, and optimist 😎. I
					work at <LinkPreview url={links.wedevx}>WEDEVX</LinkPreview>, where I
					design and build backend infrastructures and microservices using{' '}
					<LinkPreview url={links.nest}>Nest.js</LinkPreview> and{' '}
					<LinkPreview url={links.fastify}>Fastify</LinkPreview>.
				</p>
			</div>
		</SectionWrapper>
	)
}

export default Hero
