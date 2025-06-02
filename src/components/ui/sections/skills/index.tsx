'use client'

import type React from 'react'

import SectionWrapper from 'shared/ui/section.wrapper'
import { LogoCarousel } from 'ui/logo-carousel'

import { logos } from './lib/logos'

const Skills: React.FC = () => {
	return (
		<SectionWrapper>
			<h3 className='mb-5 text-lg font-medium'>Tech Stack</h3>

			<LogoCarousel columnCount={4} logos={logos} />
		</SectionWrapper>
	)
}

export default Skills
