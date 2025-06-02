'use client'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import type React from 'react'

import { cn } from 'utils'

const Separator: React.FC<
	React.ComponentProps<typeof SeparatorPrimitive.Root>
> = ({
	className,
	orientation = 'horizontal',
	decorative = true,
	...props
}) => {
	return (
		<SeparatorPrimitive.Root
			data-slot='separator-root'
			decorative={decorative}
			orientation={orientation}
			className={cn(
				'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
				className
			)}
			{...props}
		/>
	)
}

export { Separator }
