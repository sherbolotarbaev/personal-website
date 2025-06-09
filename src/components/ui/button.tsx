import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import type React from 'react'

import { cn } from 'utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[20px] text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				// default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				default:
					'relative font-regular dark:text-foreground ease-out duration-200 outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-gradient-to-b from-[hsl(var(--primary-gradient-start))] to-[hsl(var(--primary-gradient-end))] hover:opacity-90 text-primary-foreground border-[hsl(var(--primary-gradient-start))] focus-visible:outline-[hsl(var(--primary-gradient-start))] data-[state=open]:opacity-90 data-[state=open]:outline-[hsl(var(--primary-gradient-start))]',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:hover:bg-input/50',
				secondary:
					'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-3 py-2',
				sm: 'h-8 px-3 text-xs rounded-lg',
				lg: 'h-10 rounded-3xl px-4',
				icon: 'size-8 p-1.5 text-xs rounded-lg',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

const Button: React.FC<
	React.ComponentProps<'button'> &
		VariantProps<typeof buttonVariants> & {
			asChild?: boolean
			link?: string
		}
> = ({ className, variant, size, asChild = false, link, ...props }) => {
	const Comp = asChild ? Slot : 'button'

	if (link) {
		return (
			<Link href={link} passHref>
				<Comp
					data-slot='button'
					className={cn(buttonVariants({ variant, size, className }))}
					{...props}
				/>
			</Link>
		)
	}

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
