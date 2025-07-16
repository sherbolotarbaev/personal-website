'use client'

import { AnimatePresence, motion, Variants } from 'motion/react'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import { cn } from 'utils'

interface AnimatedTextCycleProps {
	words: React.ReactNode[]
	interval?: number
	className?: string
}

export const AnimatedTextCycle: React.FC<AnimatedTextCycleProps> = ({
	words,
	interval = 5000,
	className = '',
}) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [width, setWidth] = useState('auto')
	const measureRef = useRef<HTMLDivElement>(null)

	// Get the width of the current word
	useEffect(() => {
		if (measureRef.current) {
			const elements = measureRef.current.children
			if (elements.length > currentIndex) {
				// Add a small buffer (10px) to prevent text wrapping
				const newWidth = elements[currentIndex].getBoundingClientRect().width
				setWidth(`${newWidth}px`)
			}
		}
	}, [currentIndex])

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex(prevIndex => (prevIndex + 1) % words.length)
		}, interval)

		return () => clearInterval(timer)
	}, [interval, words.length])

	// Container animation for the whole word
	const containerVariants: Variants = {
		hidden: {
			y: -10,
			opacity: 0,
			filter: 'blur(8px)',
		},
		visible: {
			y: 0,
			opacity: 1,
			filter: 'blur(0px)',
			transition: {
				duration: 0.3,
				ease: 'easeOut',
			},
		},
		exit: {
			y: 10,
			opacity: 0,
			filter: 'blur(8px)',
			transition: {
				duration: 0.2,
				ease: 'easeIn',
			},
		},
	}

	return (
		<>
			{/* Hidden measurement div with all words rendered */}
			<div
				ref={measureRef}
				aria-hidden='true'
				className='absolute opacity-0 pointer-events-none'
				style={{ visibility: 'hidden' }}
			>
				{words.map((word, i) => (
					<span key={i} className={className}>
						{word}
					</span>
				))}
			</div>

			{/* Visible animated word */}
			<motion.span
				className='relative inline-block'
				animate={{
					width,
					transition: {
						type: 'spring',
						stiffness: 150,
						damping: 15,
						mass: 1.2,
					},
				}}
			>
				<AnimatePresence mode='wait' initial={false}>
					<motion.span
						key={currentIndex}
						className={cn('inline-block', className)}
						variants={containerVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
						style={{ whiteSpace: 'nowrap' }}
					>
						{words[currentIndex]}
					</motion.span>
				</AnimatePresence>
			</motion.span>
		</>
	)
}
