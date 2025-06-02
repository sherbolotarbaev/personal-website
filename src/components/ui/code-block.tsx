'use client'

import React, { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
	coldarkDark,
	oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

import { useTheme } from 'next-themes'
import CopyButton from 'shared/ui/copy-button'
import { Card, CardContent, CardHeader } from 'ui/card'

interface CodeBlockProps {
	filename: string
	language: string
	codeContent: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({
	filename,
	language,
	codeContent,
}) => {
	const { theme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	// Use resolvedTheme for more reliable theme detection, fallback to light theme during SSR
	const currentTheme = mounted ? resolvedTheme || theme : 'light'

	const customDarkTheme = {
		...coldarkDark,
		'pre[class*="language-"]': {
			...coldarkDark['pre[class*="language-"]'],
			background: 'transparent',
		},
		'code[class*="language-"]': {
			...coldarkDark['code[class*="language-"]'],
			background: 'transparent',
		},
	}

	const customLightTheme = {
		...oneLight,
		'pre[class*="language-"]': {
			...oneLight['pre[class*="language-"]'],
			background: 'transparent',
		},
		'code[class*="language-"]': {
			...oneLight['code[class*="language-"]'],
			background: 'transparent',
		},
	}

	return (
		<Card className='relative p-0 my-6 shadow-none dark:bg-zinc-900 overflow-hidden dark:border-zinc-800 gap-0'>
			<CardHeader className='p-0 rounded-t-lg'>
				<div className='flex items-center justify-between border-b dark:border-zinc-800 px-3 py-2.5'>
					<span className='text-sm text-zinc-500 dark:text-zinc-400 tracking-tight leading-0'>
						{filename || language}
					</span>
					<CopyButton content={codeContent} />
				</div>
			</CardHeader>

			<CardContent className='p-3 pt-0'>
				<SyntaxHighlighter
					language={language}
					style={currentTheme === 'dark' ? customDarkTheme : customLightTheme}
					showLineNumbers={language !== 'bash'}
					wrapLines={true}
					customStyle={{
						margin: 0,
						padding: 0,
						fontSize: '14px',
						msOverflowStyle: 'none',
						scrollbarWidth: 'none',
					}}
					lineNumberStyle={
						language !== 'bash'
							? {
									minWidth: '2.2em',
									paddingRight: '1.2em',
									userSelect: 'none',
									textAlign: 'right',
									color: currentTheme === 'dark' ? '#e6e6e6' : '#525252',
							  }
							: undefined
					}
				>
					{codeContent}
				</SyntaxHighlighter>
			</CardContent>
		</Card>
	)
}

export default CodeBlock
