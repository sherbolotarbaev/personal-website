import ContainerWrapper from 'shared/ui/container.wrapper'
import Blog from 'ui/sections/blog'
import Connect from 'ui/sections/connect'
import Experience from 'ui/sections/experience'
import Hero from 'ui/sections/hero'
import Projects from 'ui/sections/projects'
import Skills from 'ui/sections/skills'

export default function HomePage() {
	return (
		<ContainerWrapper>
			<Hero />
			<Projects />
			<Experience />
			<Skills />
			<Blog />
			<Connect />
		</ContainerWrapper>
	)
}
