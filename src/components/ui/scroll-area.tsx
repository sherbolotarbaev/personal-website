'use client'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import type React from 'react'

import { cn } from 'utils'

const ScrollArea: React.FC<
	React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
		hideScrollBar?: boolean
	}
> = ({ className, children, hideScrollBar, ...props }) => {
	return (
		<ScrollAreaPrimitive.Root
			data-slot='scroll-area'
			className={cn('relative size-full', className)}
			{...props}
		>
			<ScrollAreaPrimitive.Viewport
				data-slot='scroll-area-viewport'
				className='size-full rounded-[inherit] transition-[color,box-shadow] outline-none'
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar hidden={hideScrollBar} />
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	)
}

const ScrollBar: React.FC<
	React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
> = ({ className, orientation = 'vertical', ...props }) => {
	return (
		<ScrollAreaPrimitive.ScrollAreaScrollbar
			data-slot='scroll-area-scrollbar'
			orientation={orientation}
			className={cn(
				'flex touch-none p-px transition-colors select-none',
				orientation === 'vertical' &&
					'h-full w-2.5 border-l border-l-transparent',
				orientation === 'horizontal' &&
					'h-2.5 flex-col border-t border-t-transparent',
				className
			)}
			{...props}
		>
			<ScrollAreaPrimitive.ScrollAreaThumb
				data-slot='scroll-area-thumb'
				className='bg-border relative flex-1 rounded-full'
			/>
		</ScrollAreaPrimitive.ScrollAreaScrollbar>
	)
}

export { ScrollArea, ScrollBar }
