import type React from 'react'

import { cn } from 'utils'

interface SectionBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	icon?: React.ReactNode
	text: string
	className?: string
}

const SectionBadge: React.FC<SectionBadgeProps> = ({
	icon,
	text,
	className,
}) => {
	return (
		<p
			className={cn(
				'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-background px-3 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400 shadow-sm shadow-black/[.12] dark:bg-accent/60 hover:bg-accent/80 transition-colors',
				className
			)}
		>
			{icon && (
				<span className='flex shrink-0 border-r border-input pr-1.5 [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0'>
					{icon}
				</span>
			)}
			{text}
		</p>
	)
}

export default SectionBadge

export function StarIcon({ fill }: { fill?: string }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={12}
			height={12}
			fill='none'
			className='transition-transform group-hover:scale-110 duration-300'
		>
			<path
				className={cn('fill-zinc-500', fill)}
				d='M6.958.713a1 1 0 0 0-1.916 0l-.999 3.33-3.33 1a1 1 0 0 0 0 1.915l3.33.999 1 3.33a1 1 0 0 0 1.915 0l.999-3.33 3.33-1a1 1 0 0 0 0-1.915l-3.33-.999-1-3.33Z'
			/>
		</svg>
	)
}
