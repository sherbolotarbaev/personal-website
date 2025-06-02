'use client'

import { useTheme } from 'next-themes'
import type React from 'react'
import { useEffect, useState } from 'react'

import { AnimatedBackground } from 'ui/animated-background'

import { siteConfig } from 'config/site'

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { AnimatedTextCycle } from './ui/animated-text-cycle'
import { Button } from './ui/button'

const THEMES_OPTIONS = [
	{
		label: 'Light',
		id: 'light',
		icon: <SunIcon className='size-4' />,
	},
	{
		label: 'Dark',
		id: 'dark',
		icon: <MoonIcon className='size-4' />,
	},
	{
		label: 'System',
		id: 'system',
		icon: <MonitorIcon className='size-4' />,
	},
]

const ThemeSwitch: React.FC = () => {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<AnimatedBackground
			className='pointer-events-none rounded-lg bg-zinc-100 dark:bg-zinc-800'
			defaultValue={theme}
			transition={{
				type: 'spring',
				bounce: 0,
				duration: 0.2,
			}}
			enableHover={false}
			onValueChange={id => {
				setTheme(id as string)
			}}
		>
			{THEMES_OPTIONS.map(theme => {
				return (
					<Button
						key={theme.id}
						variant='ghost'
						size='icon'
						className='text-zinc-500 transition-colors duration-100 data-[checked=true]:text-zinc-950 dark:text-zinc-400 dark:data-[checked=true]:text-zinc-50'
						type='button'
						aria-label={`Switch to ${theme.label} theme`}
						data-id={theme.id}
					>
						{theme.icon}
					</Button>
				)
			})}
		</AnimatedBackground>
	)
}

export const Footer: React.FC = () => {
	return (
		<footer className='mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800'>
			<div className='flex items-center justify-between'>
				<AnimatedTextCycle
					words={[
						<span key='copyright'>
							© {new Date().getFullYear()} {siteConfig.title}. All rights
							reserved.
						</span>,
						<span key='built-with'>Built with Next.js 15 and Shadcn UI.</span>,
					]}
					className='text-xs text-zinc-500'
				/>

				<div className='text-xs text-zinc-400'>
					<ThemeSwitch />
				</div>
			</div>
		</footer>
	)
}
