'use client'

import type React from 'react'

import SectionWrapper from 'shared/ui/section.wrapper'
import { LogoCarousel } from 'ui/logo-carousel'
import { Heading3 } from 'ui/sections/heading'

import { logos } from './lib/logos'

const Skills: React.FC = () => {
	return (
		<SectionWrapper>
			<Heading3>Tech Stack</Heading3>

			<LogoCarousel columnCount={4} logos={logos} />
		</SectionWrapper>
	)
}

export default Skills
