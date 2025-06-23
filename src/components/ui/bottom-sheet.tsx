'use client'

import type React from 'react'
import { useState } from 'react'

import { useMediaQuery } from 'hooks/use-media-query'

import { Button } from 'ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from 'ui/drawer'
import { ScrollArea } from 'ui/scroll-area'

interface BottomSheetProps {
	open?: boolean
	onOpenChange?(open: boolean): void
	children: React.ReactNode
	title?: string
}

const snapPoints = [1]

const BottomSheet: React.FC<BottomSheetProps> = ({
	open,
	onOpenChange,
	children,
	title,
}) => {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	const [snap, setSnap] = useState<number | string | null>(snapPoints[0])

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className='bg-neutral-100/80 border-y-neutral-50/90 border-x-neutral-50/80 text-neutral-900 dark:bg-neutral-950/80 dark:border-y-neutral-400/30 dark:border-x-neutral-400/20 dark:text-neutral-100 backdrop-blur-[3px] p-0 w-[405px] max-w-none h-[385px] max-h-none shadow-[0_0_15px_rgba(0,0,0,0.25)] overflow-hidden gap-0'>
					{title && (
						<DialogHeader className='flex-shrink-0 p-4'>
							<DialogTitle>{title}</DialogTitle>
						</DialogHeader>
					)}

					<ScrollArea className='flex-1 min-h-0' hideScrollBar={true}>
						{children}
					</ScrollArea>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer
			open={open}
			onOpenChange={onOpenChange}
			snapPoints={snapPoints}
			activeSnapPoint={snap}
			setActiveSnapPoint={setSnap}
			fixed
			disablePreventScroll
			repositionInputs={false}
			snapToSequentialPoint
			autoFocus
		>
			<DrawerContent className='bg-neutral-100/80 border-t-neutral-50/90 border-x-neutral-50/80 text-neutral-900 dark:bg-neutral-950/80 dark:border-t-neutral-400/30 dark:border-x-neutral-400/20 dark:text-neutral-100 backdrop-blur-[3px]'>
				<div className='flex flex-col h-full'>
					{title && (
						<DrawerHeader className='flex items-center flex-row justify-between'>
							<Button
								type='button'
								variant='ghost'
								className='p-1.5 py-0 h-0 w-12 text-sm rounded-sm'
								onClick={() => onOpenChange?.(false)}
							>
								Cancel
							</Button>

							<DrawerTitle>{title}</DrawerTitle>

							<div className='w-12' />
						</DrawerHeader>
					)}

					<ScrollArea className='flex-1 min-h-0' hideScrollBar={true}>
						{children}
					</ScrollArea>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export default BottomSheet
