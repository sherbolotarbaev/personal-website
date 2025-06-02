'use client'

import { motion } from 'motion/react'
import type React from 'react'

import { TRANSITION_SECTION, VARIANTS_SECTION } from 'lib/constants'

interface SectionWrapperProps {
	children: React.ReactNode
	className?: string
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
	children,
	className,
}) => {
	return (
		<motion.section
			variants={VARIANTS_SECTION}
			transition={TRANSITION_SECTION}
			className={className}
		>
			{children}
		</motion.section>
	)
}

export default SectionWrapper
