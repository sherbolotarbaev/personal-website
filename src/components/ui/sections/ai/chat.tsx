'use client'

import { cn } from 'lib/utils'
import { ArrowUpIcon, Paperclip } from 'lucide-react'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Textarea } from 'ui/textarea'

interface UseAutoResizeTextareaProps {
	minHeight: number
	maxHeight?: number
}

function useAutoResizeTextarea({
	minHeight,
	maxHeight,
}: UseAutoResizeTextareaProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const adjustHeight = useCallback(
		(reset?: boolean) => {
			const textarea = textareaRef.current
			if (!textarea) return

			if (reset) {
				textarea.style.height = `${minHeight}px`
				return
			}

			// Temporarily shrink to get the right scrollHeight
			textarea.style.height = `${minHeight}px`

			// Calculate new height
			const newHeight = Math.max(
				minHeight,
				Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
			)

			textarea.style.height = `${newHeight}px`
		},
		[minHeight, maxHeight]
	)

	useEffect(() => {
		// Set initial height
		const textarea = textareaRef.current
		if (textarea) {
			textarea.style.height = `${minHeight}px`
		}
	}, [minHeight])

	// Adjust height on window resize
	useEffect(() => {
		const handleResize = () => adjustHeight()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [adjustHeight])

	return { textareaRef, adjustHeight }
}

export const Chat: React.FC = () => {
	const [value, setValue] = useState('')
	const { textareaRef, adjustHeight } = useAutoResizeTextarea({
		minHeight: 60,
		maxHeight: 200,
	})

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			if (value.trim()) {
				setValue('')
				adjustHeight(true)
			}
		}
	}

	return (
		<div className='relative bg-white dark:bg-neutral-900 rounded-xl border border-gray-300 dark:border-neutral-800'>
			<div className='overflow-y-auto'>
				<Textarea
					ref={textareaRef}
					value={value}
					onChange={e => {
						setValue(e.target.value)
						adjustHeight()
					}}
					onKeyDown={handleKeyDown}
					placeholder='Ask AI a question about me...'
					className={cn(
						'w-full px-4 py-3',
						'resize-none',
						'bg-transparent',
						'border-none',
						'text-gray-900 dark:text-white text-sm',
						'focus:outline-none',
						'focus-visible:ring-0 focus-visible:ring-offset-0',
						'placeholder:text-gray-500 dark:placeholder:text-neutral-500 placeholder:text-sm',
						'min-h-[60px]'
					)}
					style={{
						overflow: 'hidden',
					}}
				/>
			</div>

			<div className='flex items-center justify-between p-3'>
				<div className='flex items-center gap-2'>
					<button
						type='button'
						disabled
						className='group p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1'
					>
						<Paperclip className='w-4 h-4 text-gray-600 dark:text-white' />
						<span className='text-xs text-gray-600 dark:text-zinc-400 hidden group-hover:inline transition-opacity'>
							Attach
						</span>
					</button>
				</div>
				<div className='flex items-center gap-2'>
					<button
						type='button'
						className={cn(
							'px-1.5 py-1.5 rounded-lg text-sm transition-colors border hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center justify-between gap-1',
							value.trim()
								? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
								: 'border-gray-300 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-600 text-gray-500 dark:text-zinc-400'
						)}
					>
						<ArrowUpIcon
							className={cn(
								'w-4 h-4',
								value.trim()
									? 'text-white dark:text-black'
									: 'text-gray-500 dark:text-zinc-400'
							)}
						/>
						<span className='sr-only'>Send</span>
					</button>
				</div>
			</div>
		</div>
	)
}

interface ActionButtonProps {
	icon: React.ReactNode
	label: string
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label }) => {
	return (
		<button
			type='button'
			className='flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-full border border-gray-300 dark:border-neutral-800 text-gray-700 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors'
		>
			{icon}
			<span className='text-xs'>{label}</span>
		</button>
	)
}
