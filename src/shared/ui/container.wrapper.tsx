'use client'

import { motion } from 'motion/react'
import type React from 'react'

import { VARIANTS_CONTAINER } from 'lib/constants'
import { cn } from 'utils'

interface ContainerWrapperProps {
	children: React.ReactNode
	className?: string
}

const ContainerWrapper: React.FC<ContainerWrapperProps> = ({
	children,
	className,
}) => {
	return (
		<motion.section
			className={cn('space-y-16', className)}
			variants={VARIANTS_CONTAINER}
			initial='hidden'
			animate='visible'
		>
			{children}
		</motion.section>
	)
}

export default ContainerWrapper
