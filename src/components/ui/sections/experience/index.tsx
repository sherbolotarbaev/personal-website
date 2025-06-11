'use client'

import { AnimatePresence, motion, useInView } from 'motion/react'
import type React from 'react'
import { Fragment, useRef, useState } from 'react'

import ImageThumbnail from 'shared/ui/image-thumbnail'
import SectionWrapper from 'shared/ui/section.wrapper'
import { Badge } from 'ui/badge'
import { Button } from 'ui/button'
import LinkPreview from 'ui/link-preview'
import { Heading3 } from 'ui/sections/heading'
import { Separator } from 'ui/separator'

import {
	experiences,
	formatExperiences,
	type TExperience,
} from './lib/experiences'

import { ChevronDown, ChevronUp } from 'lucide-react'

const Work: React.FC = () => {
	return (
		<SectionWrapper>
			<Heading3>Work Experience</Heading3>

			<div className='flex flex-col gap-2'>
				{formatExperiences(experiences).map((props, index) => (
					<Fragment key={index}>
						<Experience {...props} />
						{index < experiences.length - 1 && <Separator className='my-4' />}
					</Fragment>
				))}
			</div>
		</SectionWrapper>
	)
}

export default Work

const Experience: React.FC<TExperience> = ({
	company,
	duration,
	location,
	url,
	positions,
	type,
}) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })
	const [isExpanded, setIsExpanded] = useState(false)

	const toggleExpanded = () => {
		if (positions.length === 0) return
		setIsExpanded(!isExpanded)
	}

	return (
		<motion.div
			ref={ref}
			className='flex-1'
			initial={{ opacity: 0, y: 50 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.5 }}
		>
			<div className='mb-3 cursor-pointer select-none' onClick={toggleExpanded}>
				<div className='flex items-center justify-between'>
					<div className='flex-1'>
						<LinkPreview url={url} className='text-[16.5px]'>
							{company}
						</LinkPreview>

						<div className='flex flex-col'>
							<span className='text-sm text-zinc-600 dark:text-zinc-400'>
								{duration.startDate} - {duration.endDate}{' '}
								{duration.totalDuration && `· ${duration.totalDuration}`}
							</span>
							<span className='text-sm text-zinc-600 dark:text-zinc-400'>
								{location} · {type}
							</span>
						</div>
					</div>

					{positions.length > 0 && (
						<Button
							variant='ghost'
							size='icon'
							className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300'
						>
							{isExpanded ? <ChevronUp /> : <ChevronDown />}
						</Button>
					)}
				</div>
			</div>

			<AnimatePresence mode='wait'>
				{isExpanded && (
					<motion.div
						initial={{ opacity: 0, height: 0, y: -20 }}
						animate={{
							opacity: 1,
							height: 'auto',
							y: 0,
							transition: {
								height: { duration: 0.25, ease: 'easeInOut' },
								opacity: { duration: 0.2, delay: 0.05 },
								y: { duration: 0.25, ease: 'easeOut' },
							},
						}}
						exit={{
							opacity: 0,
							height: 0,
							y: -10,
							transition: {
								height: { duration: 0.2, ease: 'easeInOut', delay: 0.05 },
								opacity: { duration: 0.15 },
								y: { duration: 0.2, ease: 'easeIn' },
							},
						}}
						className='overflow-hidden'
					>
						<div className='flex flex-col gap-6 relative pt-2'>
							{positions.map(
								({ title, description, period, covers, skills }, posIndex) => (
									<motion.div
										key={posIndex}
										className='relative pl-6'
										initial={{ opacity: 0, y: 20 }}
										animate={
											isInView && isExpanded
												? { opacity: 1, y: 0 }
												: { opacity: 0, y: 20 }
										}
										transition={{
											duration: 0.3,
											delay: posIndex * 0.05 + 0.1,
											ease: 'easeOut',
										}}
									>
										<motion.div
											className='absolute left-0 top-1.5 size-2 rounded-full bg-zinc-500 dark:bg-zinc-400'
											initial={{ scale: 0, opacity: 0 }}
											animate={
												isInView && isExpanded
													? { scale: 1, opacity: 1 }
													: { scale: 0, opacity: 0 }
											}
											transition={{
												duration: 0.2,
												delay: posIndex * 0.05 + 0.15,
												ease: 'easeOut',
											}}
										/>
										{posIndex !== positions.length - 1 && (
											<motion.div
												className='absolute left-[3.3px] top-4 bottom-[-24px] w-[1px] bg-zinc-200 dark:bg-zinc-800'
												initial={{ scaleY: 0, opacity: 0 }}
												animate={
													isInView && isExpanded
														? { scaleY: 1, opacity: 1 }
														: { scaleY: 0, opacity: 0 }
												}
												transition={{
													duration: 0.3,
													delay: posIndex * 0.05 + 0.2,
													ease: 'easeOut',
												}}
												style={{ originY: 0 }}
											/>
										)}

										<div className='leading-relaxed mb-1'>
											<h3 className='tracking-tight font-medium'>{title}</h3>

											<span className='text-sm text-zinc-600 dark:text-zinc-400'>
												{period.startDate} - {period.endDate} ·{' '}
												{period.duration}
											</span>
										</div>

										{description && (
											<motion.p
												className='leading-relaxed text-zinc-600 dark:text-zinc-300'
												dangerouslySetInnerHTML={{
													__html: description,
												}}
												initial={{ opacity: 0, y: 10 }}
												animate={
													isInView && isExpanded
														? { opacity: 1, y: 0 }
														: { opacity: 0, y: 10 }
												}
												transition={{
													duration: 0.25,
													delay: posIndex * 0.05 + 0.2,
													ease: 'easeOut',
												}}
											/>
										)}

										{covers && covers.length > 0 && (
											<motion.div
												className='mt-4 flex flex-wrap gap-3'
												initial={{ opacity: 0, y: 20 }}
												animate={
													isInView && isExpanded
														? { opacity: 1, y: 0 }
														: { opacity: 0, y: 20 }
												}
												transition={{
													duration: 0.3,
													delay: posIndex * 0.05 + 0.25,
													ease: 'easeOut',
												}}
											>
												{covers.map((cover, coverIndex) => (
													<motion.div
														key={coverIndex}
														initial={{ opacity: 0, scale: 0.9 }}
														animate={
															isInView && isExpanded
																? { opacity: 1, scale: 1 }
																: { opacity: 0, scale: 0.9 }
														}
														transition={{
															duration: 0.2,
															delay: posIndex * 0.05 + 0.3 + coverIndex * 0.05,
															ease: 'easeOut',
														}}
													>
														<ImageThumbnail
															src={cover || '/placeholder.svg'}
															alt={`${title} - ${company} (cover ${
																coverIndex + 1
															})`}
															className='md:max-w-72 shadow-lg'
														/>
													</motion.div>
												))}
											</motion.div>
										)}

										{skills && skills.length > 0 && (
											<motion.div
												className='flex flex-wrap gap-2 mt-4'
												initial={{ opacity: 0, y: 15 }}
												animate={
													isInView && isExpanded
														? { opacity: 1, y: 0 }
														: { opacity: 0, y: 15 }
												}
												transition={{
													duration: 0.25,
													delay: posIndex * 0.05 + 0.3,
													ease: 'easeOut',
												}}
											>
												{skills.map((skill, skillIndex) => (
													<motion.div
														key={skillIndex}
														initial={{ opacity: 0, scale: 0.8 }}
														animate={
															isInView && isExpanded
																? { opacity: 1, scale: 1 }
																: { opacity: 0, scale: 0.8 }
														}
														transition={{
															duration: 0.15,
															delay: posIndex * 0.05 + 0.35 + skillIndex * 0.03,
															ease: 'easeOut',
														}}
													>
														<Badge
															variant='secondary'
															className='bg-zinc-100 text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'
														>
															{skill}
														</Badge>
													</motion.div>
												))}
											</motion.div>
										)}
									</motion.div>
								)
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}
