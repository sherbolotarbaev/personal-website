import type React from 'react'

import SectionWrapper from 'shared/ui/section.wrapper'
import { Heading3 } from 'ui/sections/heading'
import { Chat } from './chat'

const AI: React.FC = () => {
	return (
		<SectionWrapper>
			<Heading3>AI</Heading3>

			<Chat />
		</SectionWrapper>
	)
}

export default AI
