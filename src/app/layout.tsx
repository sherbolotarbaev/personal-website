import './globals.css'

import { siteConfig } from 'config/site'
import type { Metadata, Viewport } from 'next'

import { Footer } from 'components/footer'
import { Header } from 'components/header'
import Providers from 'providers'

import { geistMono, geistSans } from 'fonts'
import { cn } from 'utils'

export const metadata: Metadata = {
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.title}`,
	},
	description: siteConfig.description,
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: siteConfig.title,
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: siteConfig.title,
		locale: 'en_US',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
}

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width',
	maximumScale: 1,
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	return (
		<>
			<html lang='en' suppressHydrationWarning>
				<body
					className={cn(
						geistMono.className,
						geistSans.className,
						'min-h-screen antialiased bg-white dark:bg-zinc-950 text-sm md:text-base'
					)}
				>
					<Providers>
						<div className='flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]'>
							<div className='relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20'>
								<Header />
								{children}
								<Footer />
							</div>
						</div>
					</Providers>
				</body>
			</html>
		</>
	)
}
