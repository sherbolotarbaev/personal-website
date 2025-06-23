'use client'

import type React from 'react'

import SectionWrapper from 'shared/ui/section.wrapper'
import { Button } from 'ui/button'
import LinkPreview from 'ui/link-preview'

import { ContactEnum } from 'config/contact'
import { socialMedia } from 'config/social-media'
import { useModalStore } from 'lib/store'
import { links } from './lib/links'

import { Mail, MessageCircle } from 'lucide-react'

const Hero: React.FC = () => {
	const { toggleModal } = useModalStore()

	return (
		<SectionWrapper>
			<div className='flex w-full flex-col gap-5'>
				<div className='flex items-center gap-2.5'>
					{socialMedia.map(({ name, href, icon }) => (
						<Button
							size='icon'
							variant='outline'
							key={name}
							link={href}
							target='_blank'
						>
							{icon}
						</Button>
					))}
				</div>

				<p className='text-zinc-600 dark:text-zinc-300'>
					I’m a software engineer from Kyrgyzstan 🇰🇬 at{' '}
					<LinkPreview url={links.peopleup}>PeopleUp</LinkPreview>. I build
					backend infrastructures and microservices with{' '}
					<LinkPreview url={links.nest}>Nest.js</LinkPreview> and{' '}
					<LinkPreview url={links.fastify}>Fastify</LinkPreview>, and lead our
					one-hour system-design interviews to vet and mentor top engineering
					talent.
				</p>

				<div className='flex items-center gap-2.5'>
					<Button onClick={toggleModal}>
						<MessageCircle />
						Get in touch
					</Button>
					<Button link={ContactEnum.EMAIL} variant='outline'>
						<Mail /> Email
					</Button>
				</div>
			</div>
		</SectionWrapper>
	)
}

export default Hero
