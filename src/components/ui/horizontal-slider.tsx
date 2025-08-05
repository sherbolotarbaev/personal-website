'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'

import { ScrollArea, ScrollBar } from 'ui/scroll-area'

import { cn } from 'utils'

interface HorizontalSliderProps {
	items: React.ReactElement[]
	className?: string
}

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({
	items,
	className,
}) => {
	const [showLeftButton, setShowLeftButton] = useState(false)
	const [showRightButton, setShowRightButton] = useState(true)
	const scrollAreaRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const scrollArea = scrollAreaRef.current
		if (!scrollArea) return

		const viewport = scrollArea.querySelector(
			'[data-radix-scroll-area-viewport]'
		) as HTMLElement | null

		if (!viewport) return

		const checkScroll = () => {
			setShowLeftButton(viewport.scrollLeft > 20)
			setShowRightButton(
				Math.ceil(viewport.scrollLeft + viewport.clientWidth) <
					viewport.scrollWidth - 20
			)
		}

		viewport.addEventListener('scroll', checkScroll)
		checkScroll()

		window.addEventListener('resize', checkScroll)

		return () => {
			viewport.removeEventListener('scroll', checkScroll)
			window.removeEventListener('resize', checkScroll)
		}
	}, [])

	return (
		<div
			className={cn(
				'relative w-full max-w-[clamp(22.5rem,_94.5vw,_38.5rem)]',
				className
			)}
			ref={scrollAreaRef}
		>
			<ScrollArea className='w-full -mx-1 px-1'>
				<div
					className='flex items-center gap-4'
					style={{
						minWidth: '100%',
						paddingLeft: '1px',
						paddingRight: '1px',
					}}
				>
					{items}
				</div>
				<ScrollBar orientation='horizontal' className='invisible' />
				<ScrollBar orientation='vertical' className='invisible' />
			</ScrollArea>

			<div
				className={cn(
					'pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent transition-opacity',
					showLeftButton ? 'opacity-100' : 'opacity-0'
				)}
			/>
			<div
				className={cn(
					'pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent transition-opacity',
					showRightButton ? 'opacity-100' : 'opacity-0'
				)}
			/>
		</div>
	)
}

export default HorizontalSlider
