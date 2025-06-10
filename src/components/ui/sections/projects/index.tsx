'use client'

import { AnimatePresence, motion, useInView } from 'motion/react'
import Image from 'next/image'
import type React from 'react'
import { useRef, useState } from 'react'

import SectionWrapper from 'shared/ui/section.wrapper'
import { Button } from 'ui/button'
import {
	MorphingDialog,
	MorphingDialogClose,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogTrigger,
} from 'ui/morphing-dialog'
import { Heading3 } from 'ui/sections/heading'

import { cn } from 'utils'
import { projects, TProject } from './lib/projects'

import { ExternalLink, Github, XIcon } from 'lucide-react'

interface PreviewButtonProps {
	children: React.ReactNode
	href: string
	className?: string
}

const PreviewButton: React.FC<PreviewButtonProps> = ({
	children,
	href,
	className,
}) => {
	return (
		<Button
			variant='ghost'
			size='sm'
			link={href}
			target='_blank'
			onLinkClick={e => e.stopPropagation()}
			className={cn(
				'transition-colors duration-200 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-100 cursor-pointer rounded-full text-xs gap-1',
				className
			)}
		>
			{children}
		</Button>
	)
}

interface PreviewButtonsProps {
	repo?: string
	demo?: string
}

const PreviewButtons: React.FC<PreviewButtonsProps> = ({ repo, demo }) => {
	return (
		<div className='absolute top-2 right-2 flex gap-2 sm:group-hover:opacity-100 sm:opacity-0 sm:transition-opacity sm:duration-300'>
			{repo && (
				<PreviewButton href={repo}>
					<Github className='size-3.5' /> Repo
				</PreviewButton>
			)}
			{demo && (
				<PreviewButton href={demo}>
					<ExternalLink className='size-3.5' /> Demo
				</PreviewButton>
			)}
		</div>
	)
}

interface ProjectMediaProps extends PreviewButtonsProps {
	src: string
	alt?: string
}

const ProjectVideo: React.FC<ProjectMediaProps> = ({ src, repo, demo }) => {
	return (
		<MorphingDialog
			transition={{
				type: 'spring',
				bounce: 0,
				duration: 0.3,
			}}
		>
			<MorphingDialogTrigger>
				<div className='relative aspect-video w-full cursor-zoom-in rounded-xl overflow-hidden group'>
					<video
						src={src}
						autoPlay
						loop
						muted
						className='aspect-video w-full'
					/>
					<PreviewButtons repo={repo} demo={demo} />
				</div>
			</MorphingDialogTrigger>
			<MorphingDialogContainer>
				<MorphingDialogContent className='relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50'>
					<video
						src={src}
						autoPlay
						loop
						muted
						className='aspect-video h-[50vh] w-full rounded-xl md:h-[70vh]'
					/>
				</MorphingDialogContent>
				<MorphingDialogClose
					className='fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1'
					variants={{
						initial: { opacity: 0 },
						animate: {
							opacity: 1,
							transition: { delay: 0.3, duration: 0.1 },
						},
						exit: { opacity: 0, transition: { duration: 0 } },
					}}
				>
					<XIcon className='size-5 text-zinc-500' />
				</MorphingDialogClose>
			</MorphingDialogContainer>
		</MorphingDialog>
	)
}

const ProjectImage: React.FC<ProjectMediaProps> = ({
	src,
	alt = 'Project preview',
	repo,
	demo,
}) => {
	return (
		<MorphingDialog
			transition={{
				type: 'spring',
				bounce: 0,
				duration: 0.3,
			}}
		>
			<MorphingDialogTrigger>
				<div className='relative aspect-video w-full cursor-zoom-in rounded-xl overflow-hidden group'>
					<Image
						src={src}
						alt={alt}
						width={1280}
						height={720}
						className='w-full h-full object-cover'
						loading='lazy'
					/>
					<PreviewButtons repo={repo} demo={demo} />
				</div>
			</MorphingDialogTrigger>
			<MorphingDialogContainer>
				<MorphingDialogContent className='relative rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50'>
					<div className='h-[50vh] md:h-[70vh] rounded-xl overflow-hidden'>
						<Image
							src={src}
							alt={alt}
							width={1920}
							height={1080}
							className='w-full h-full object-contain'
							loading='lazy'
						/>
					</div>
				</MorphingDialogContent>
				<MorphingDialogClose
					className='fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1'
					variants={{
						initial: { opacity: 0 },
						animate: {
							opacity: 1,
							transition: { delay: 0.3, duration: 0.1 },
						},
						exit: { opacity: 0, transition: { duration: 0 } },
					}}
				>
					<XIcon className='size-5 text-zinc-500' />
				</MorphingDialogClose>
			</MorphingDialogContainer>
		</MorphingDialog>
	)
}

const Projects: React.FC = () => {
	const [showAll, setShowAll] = useState(false)
	const defaultProjectsCount = 2
	const displayedProjects = showAll
		? projects
		: projects.slice(0, defaultProjectsCount)
	const hasMoreProjects = projects.length > defaultProjectsCount

	return (
		<SectionWrapper>
			<Heading3>Featured Projects</Heading3>
			<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
				<AnimatePresence mode='popLayout'>
					{displayedProjects.map((project, index) => (
						<Project key={project.title} {...project} index={index} />
					))}
				</AnimatePresence>
			</div>

			{hasMoreProjects && (
				<motion.div
					className='mt-8 flex justify-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.05 }}
				>
					<Button
						size='sm'
						variant='ghost'
						className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300'
						onClick={() => setShowAll(!showAll)}
					>
						{showAll ? 'Show less..' : 'See more..'}
					</Button>
				</motion.div>
			)}
		</SectionWrapper>
	)
}

export default Projects

const Project: React.FC<TProject & { index?: number }> = ({
	title,
	description,
	video,
	image,
	repo,
	demo,
	index = 0,
}) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })

	return (
		<motion.div
			ref={ref}
			className='flex-1 space-y-3'
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5, delay: index * 0.05 }}
			layout
			layoutRoot
		>
			{(video || image) && (
				<div className='relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50'>
					{video ? (
						<ProjectVideo
							src={video}
							alt={`${title} preview`}
							repo={repo}
							demo={demo}
						/>
					) : image ? (
						<ProjectImage
							src={image}
							alt={`${title} preview`}
							repo={repo}
							demo={demo}
						/>
					) : null}
				</div>
			)}
			<div className='flex flex-col gap-1 px-1'>
				<h4 className='max-w-fit font-base inline-block font-[450] text-[16.5px] text-zinc-900 dark:text-zinc-50'>
					{title}
				</h4>

				<p className='text-sm sm:text-base text-zinc-600 dark:text-zinc-400'>
					{description}
				</p>
			</div>
		</motion.div>
	)
}
