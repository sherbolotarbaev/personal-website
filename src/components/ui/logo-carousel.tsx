'use client'

import { AnimatePresence, motion } from 'motion/react'
import type React from 'react'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'

export interface ILogo {
	name: string
	id: number
	img: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	return shuffled
}

function distributeLogos(allLogos: ILogo[], columnCount: number): ILogo[][] {
	const shuffled = shuffleArray(allLogos)
	const columns: ILogo[][] = Array.from({ length: columnCount }, () => [])

	shuffled.forEach((logo, index) => {
		columns[index % columnCount].push(logo)
	})

	const maxLength = Math.max(...columns.map(col => col.length))
	columns.forEach(col => {
		while (col.length < maxLength) {
			col.push(shuffled[Math.floor(Math.random() * shuffled.length)])
		}
	})

	return columns
}

interface LogoColumnProps {
	logos: ILogo[]
	index: number
	currentTime: number
}

const LogoColumn: React.FC<LogoColumnProps> = memo(
	({ logos, index, currentTime }) => {
		const cycleInterval = 2000
		const columnDelay = index * 200
		const adjustedTime =
			(currentTime + columnDelay) % (cycleInterval * logos.length)
		const currentIndex = Math.floor(adjustedTime / cycleInterval)
		const CurrentLogo = useMemo(
			() => logos[currentIndex].img,
			[logos, currentIndex]
		)

		return (
			<motion.div
				className='relative h-14 w-24 overflow-hidden md:h-24 md:w-48'
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					delay: index * 0.1,
					duration: 0.5,
					ease: 'easeOut',
				}}
			>
				<AnimatePresence mode='wait'>
					<motion.div
						key={`${logos[currentIndex].id}-${currentIndex}`}
						className='absolute inset-0 flex items-center justify-center'
						initial={{ y: '10%', opacity: 0, filter: 'blur(8px)' }}
						animate={{
							y: '0%',
							opacity: 1,
							filter: 'blur(0px)',
							transition: {
								type: 'spring',
								stiffness: 300,
								damping: 20,
								mass: 1,
								bounce: 0.2,
								duration: 0.5,
							},
						}}
						exit={{
							y: '-20%',
							opacity: 0,
							filter: 'blur(6px)',
							transition: {
								type: 'tween',
								ease: 'easeIn',
								duration: 0.3,
							},
						}}
					>
						<CurrentLogo className='size-20 max-h-[80%] max-w-[80%] object-contain md:size-32' />
					</motion.div>
				</AnimatePresence>
			</motion.div>
		)
	}
)

interface LogoCarouselProps {
	columnCount?: number
	logos: ILogo[]
}

export const LogoCarousel: React.FC<LogoCarouselProps> = ({
	columnCount = 2,
	logos,
}) => {
	const [logoSets, setLogoSets] = useState<ILogo[][]>([])
	const [currentTime, setCurrentTime] = useState(0)

	const updateTime = useCallback(() => {
		setCurrentTime(prevTime => prevTime + 100)
	}, [])

	useEffect(() => {
		const intervalId = setInterval(updateTime, 100)
		return () => clearInterval(intervalId)
	}, [updateTime])

	useEffect(() => {
		const distributedLogos = distributeLogos(logos, columnCount)
		setLogoSets(distributedLogos)
	}, [logos, columnCount])

	return (
		<div className='flex items-center gap-4'>
			{logoSets.map((logos, index) => (
				<LogoColumn
					key={index}
					logos={logos}
					index={index}
					currentTime={currentTime}
				/>
			))}
		</div>
	)
}
