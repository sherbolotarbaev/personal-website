import type { MDXComponents } from 'mdx/types'

import CodeBlock from 'ui/code-block'

import { cn } from 'utils'

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		blockquote: ({ children, className }) => {
			return (
				<blockquote
					className={cn('dark:border-zinc-700 border-zinc-200', className)}
				>
					{children}
				</blockquote>
			)
		},
		p: ({ children, className }) => {
			return (
				<p
					className={cn(
						'[blockquote_&]:before:content-none [blockquote_&]:after:content-none',
						className
					)}
				>
					{children}
				</p>
			)
		},
		li: ({ children, className }) => {
			return (
				<li
					className={cn(
						'dark:marker:text-zinc-400 marker:text-zinc-500',
						className
					)}
				>
					{children}
				</li>
			)
		},
		code: ({ className, ...props }) => {
			return (
				<code
					className='px-[0.3rem] py-[0.2rem] font-mono text-sm bg-zinc-100 dark:bg-zinc-800 rounded-md before:content-none after:content-none text-nowrap whitespace-pre-wrap'
					{...props}
				/>
			)
		},
		pre: ({ children }) => {
			const languageMatch = children.props.className?.match(/language-(\w+)/)
			const language = languageMatch ? languageMatch[1] : 'plain'
			let codeContent = (children.props.raw || '').trim()

			let filename = null
			const firstLine = codeContent.split('\n')[0]
			const filenameMatch =
				firstLine?.match(/^path=([^,\s]+)/) ||
				firstLine?.match(/^filename=([^,\s]+)/) ||
				children.props.className?.match(/language-\w+:(.+)/)

			if (filenameMatch) {
				filename = filenameMatch[1]
				// Remove the filename line from the code content
				const lines = codeContent.split('\n')
				if (lines[0].match(/^(path|filename)=/)) {
					lines.shift() // Remove the first line
					codeContent = lines.join('\n').trim()
				}
			}

			if (!filename && firstLine) {
				const fullContentMatch = codeContent.match(/filename=([^,\s\n]+)/)
				if (fullContentMatch) {
					filename = fullContentMatch[1]
					// Remove the filename declaration from anywhere in the content
					codeContent = codeContent
						.replace(/filename=([^,\s\n]+)\n?/, '')
						.trim()
				}
			}

			return (
				<CodeBlock
					filename={filename}
					language={language}
					codeContent={codeContent}
				/>
			)
		},
	}
}
