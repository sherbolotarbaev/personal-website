import CopyButton from 'shared/ui/copy-button'

interface LayoutBlogPostProps {
	children: React.ReactNode
}

export default function LayoutBlogPost({
	children,
}: Readonly<LayoutBlogPostProps>) {
	return (
		<>
			<div className='pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950' />

			<div className='absolute right-4 top-35'>
				<CopyButton variant='text' content={() => window.location.href} />
			</div>
			<main className='prose prose-gray pb-20 prose-h4:prose-base dark:prose-invert prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium'>
				{children}
			</main>
		</>
	)
}
