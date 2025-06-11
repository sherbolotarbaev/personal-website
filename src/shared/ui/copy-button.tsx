'use client'

import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from 'ui/button'
import { TextMorph } from 'ui/text-morph'
import { Tooltip, TooltipContent, TooltipTrigger } from 'ui/tooltip'

import { Check, Clipboard } from 'lucide-react'

interface CopyButtonProps {
	content: string
	variant?: 'icon' | 'text'
}

const CopyButton: React.FC<CopyButtonProps> = ({
	content,
	variant = 'icon',
}) => {
	const [copied, setCopied] = useState(false)
	const [tooltipOpen, setTooltipOpen] = useState(false)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	const copy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(content)
			setCopied(true)
			setTooltipOpen(true)

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}

			timeoutRef.current = setTimeout(() => {
				setCopied(false)
				setTooltipOpen(false)
				timeoutRef.current = null
			}, 2000)
		} catch (error) {
			console.error('Failed to copy to clipboard:', error)
		}
	}, [content])

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [])

	if (variant === 'text') {
		return (
			<Button
				variant='ghost'
				onClick={copy}
				size='sm'
				className='font-base text-zinc-500 transition-colors dark:text-zinc-400'
				type='button'
			>
				<TextMorph>{copied ? 'Copied' : 'Copy'}</TextMorph>
				<span>URL</span>
			</Button>
		)
	}

	return (
		<Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
			<TooltipTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					onClick={copy}
					className='dark:border-zinc-700 dark:bg-zinc-800 p-0 size-6 dark:hover:bg-zinc-700 rounded-sm'
				>
					{copied ? (
						<Check className='size-3.5 text-green-500 dark:text-green-300' />
					) : (
						<Clipboard className='size-3.5 dark:text-white' />
					)}
					<span className='sr-only'>Copy code</span>
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>{copied ? 'Copied!' : 'Copy'}</p>
			</TooltipContent>
		</Tooltip>
	)
}

export default CopyButton
