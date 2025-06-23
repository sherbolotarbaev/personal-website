'use client'

import { useTheme } from 'next-themes'
import type React from 'react'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster: React.FC<ToasterProps> = ({ ...props }) => {
	const { theme = 'system' } = useTheme()

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			className='toaster group'
			style={
				{
					'--normal-bg': 'var(--popover)',
					'--normal-text': 'var(--popover-foreground)',
					'--normal-border': 'var(--border)',
				} as React.CSSProperties
			}
			{...props}
		/>
	)
}

export { Toaster }
