'use client'

import { motion } from 'motion/react'
import type React from 'react'

import Link from 'next/link'
import { Magnetic } from 'ui/magnetic'
import { Heading3 } from 'ui/sections/heading'

import { ContactEnum } from 'config/contact'
import { socialMedia } from 'config/social-media'
import { TRANSITION_SECTION, VARIANTS_SECTION } from 'lib/constants'

interface MagneticSocialLinkProps {
	children: React.ReactNode
	link: string
}

const MagneticSocialLink: React.FC<MagneticSocialLinkProps> = ({
	children,
	link,
}) => {
	return (
		<Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
			<Link
				href={link}
				className='group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'
			>
				{children}
				<svg
					width='15'
					height='15'
					viewBox='0 0 15 15'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='h-3 w-3'
				>
					<path
						d='M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z'
						fill='currentColor'
						fillRule='evenodd'
						clipRule='evenodd'
					></path>
				</svg>
			</Link>
		</Magnetic>
	)
}

const Connect: React.FC = () => {
	return (
		<motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
			<Heading3>Connect</Heading3>
			<p className='mb-5 text-zinc-600 dark:text-zinc-400'>
				Feel free to contact me at{' '}
				<a className='underline dark:text-zinc-300' href={ContactEnum.EMAIL}>
					{ContactEnum.EMAIL.replace('mailto:', '')}
				</a>
			</p>
			<div className='flex items-center justify-start gap-3'>
				{socialMedia.map(({ name, href }) => (
					<MagneticSocialLink key={name} link={href}>
						{name}
					</MagneticSocialLink>
				))}
			</div>
		</motion.section>
	)
}

export default Connect
