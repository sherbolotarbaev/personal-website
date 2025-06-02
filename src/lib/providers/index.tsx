'use client'

import type React from 'react'

import { TooltipProvider } from 'ui/tooltip'
import ThemeProvider from './theme'

interface ProvidersProps {
	children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
	return (
		<>
			<TooltipProvider>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					storageKey='theme'
					enableSystem
				>
					{children}
				</ThemeProvider>
			</TooltipProvider>
		</>
	)
}

export default Providers
