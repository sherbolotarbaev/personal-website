import type React from 'react'

import type { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'

import Image from 'next/image'
import {
	MorphingDialog,
	MorphingDialogClose,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogTrigger,
} from 'ui/morphing-dialog'

import { cn } from 'utils'

import { XIcon } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from 'ui/carousel'

export type ImageThumbnailProps = Omit<
	React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>,
	'height' | 'width' | 'loading' | 'ref' | 'alt' | 'src' | 'srcSet'
> & {
	src: string
	alt: string
	aspectRatio?: number
	placeholder?: PlaceholderValue
	blurDataURL?: string
	images?: { src: string; alt: string }[]
	initialIndex?: number
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
	src,
	alt,
	aspectRatio = 16 / 9,
	placeholder,
	blurDataURL,
	className,
	images: providedImages,
	initialIndex,
	...props
}) => {
	const images = providedImages ?? [{ src, alt }]
	const startIndex = initialIndex ?? 0
	const [currentIndex, setCurrentIndex] = useState(startIndex)
	const [api, setApi] = useState<CarouselApi>()
	const thumbnailContainerRef = useRef<HTMLDivElement>(null)

	const carouselOptions = useMemo(
		() => ({
			align: 'start' as const,
			loop: false,
			startIndex: startIndex,
		}),
		[startIndex]
	)

	useEffect(() => {
		setCurrentIndex(startIndex)
	}, [startIndex])

	useEffect(() => {
		if (!api) return

		api.scrollTo(startIndex, false)

		api.on('select', () => {
			setCurrentIndex(api.selectedScrollSnap())
		})
	}, [api, startIndex])

	const scrollActiveThumbnailIntoView = useCallback(
		(index: number) => {
			const container = thumbnailContainerRef.current
			if (!container || images.length <= 1) return

			const thumbnailButton = container.children[index] as HTMLElement
			if (!thumbnailButton) return

			requestAnimationFrame(() => {
				const containerRect = container.getBoundingClientRect()
				const thumbnailRect = thumbnailButton.getBoundingClientRect()

				const padding = 8
				const isVisible =
					thumbnailRect.left >= containerRect.left - padding &&
					thumbnailRect.right <= containerRect.right + padding

				if (!isVisible) {
					thumbnailButton.scrollIntoView({
						behavior: 'smooth',
						block: 'nearest',
						inline: 'center',
					})
				}
			})
		},
		[images.length]
	)

	useEffect(() => {
		if (images.length > 1) {
			const timeoutId = setTimeout(() => {
				scrollActiveThumbnailIntoView(currentIndex)
			}, 100)

			return () => clearTimeout(timeoutId)
		}
	}, [currentIndex, images.length, scrollActiveThumbnailIntoView])

	return (
		<MorphingDialog
			transition={{
				type: 'spring',
				bounce: 0,
				duration: 0.3,
			}}
		>
			<MorphingDialogTrigger>
				<div
					className={cn(
						'w-full cursor-zoom-in rounded-xl overflow-hidden',
						className
					)}
					style={{
						aspectRatio: aspectRatio,
					}}
				>
					<Image
						src={images[currentIndex].src}
						alt={images[currentIndex].alt}
						width={1280}
						height={720}
						className='w-full h-full object-cover'
						loading='lazy'
						placeholder={placeholder}
						blurDataURL={blurDataURL}
						{...props}
					/>
				</div>
			</MorphingDialogTrigger>
			<MorphingDialogContainer>
				<MorphingDialogContent className='relative flex flex-col rounded-2xl bg-zinc-50 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50 max-h-[90vh] w-[90vw] max-w-4xl p-0'>
					{images.length === 1 ? (
						<div className='relative w-full h-[50vh] md:h-[70vh] bg-zinc-100 dark:bg-zinc-900 rounded-xl'>
							<div className='relative w-full h-full'>
								<Image
									src={images[0].src}
									alt={images[0].alt}
									fill
									className='object-contain'
									sizes='(max-width: 768px) 100vw, 70vw'
									priority
									placeholder={placeholder}
									blurDataURL={blurDataURL}
								/>
							</div>
						</div>
					) : (
						<div className='flex flex-col h-full'>
							<Carousel
								setApi={setApi}
								opts={carouselOptions}
								className='flex-1'
							>
								{/* Main Carousel - Large Images */}
								<div className='relative flex-1'>
									<CarouselContent className='h-full'>
										{images.map((img, index) => (
											<CarouselItem key={index} className='h-full'>
												<div className='relative h-[30vh] md:h-[61vh] bg-zinc-100 dark:bg-zinc-900 rounded-t-xl'>
													<Image
														src={img.src}
														alt={img.alt}
														fill
														className='object-contain'
														sizes='(max-width: 768px) 100vw, 70vw'
														priority={Math.abs(index - currentIndex) <= 1}
														loading={
															Math.abs(index - currentIndex) <= 2
																? 'eager'
																: 'lazy'
														}
													/>
												</div>
											</CarouselItem>
										))}
									</CarouselContent>
									<CarouselPrevious className='left-4 size-8 bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-800 border shadow-md' />
									<CarouselNext className='right-4 size-8 bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-800 border shadow-md' />
								</div>

								{/* Thumbnail Navigation */}
								<div className='shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-b-xl border-t border-zinc-200 dark:border-zinc-700'>
									<div
										ref={thumbnailContainerRef}
										className='flex justify-start gap-2 overflow-x-auto py-1.5 px-2'
									>
										{images.map((img, index) => (
											<button
												key={index}
												onClick={() => api?.scrollTo(index)}
												className={cn(
													'flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all',
													index === currentIndex
														? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 scale-105'
														: 'border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500 opacity-70 hover:opacity-100'
												)}
											>
												<Image
													src={img.src}
													alt={img.alt}
													width={64}
													height={48}
													className='w-full h-full object-cover'
													loading='lazy'
												/>
											</button>
										))}
									</div>
								</div>
							</Carousel>
						</div>
					)}
				</MorphingDialogContent>
				<MorphingDialogClose
					className='fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1 shadow-lg z-50'
					variants={{
						initial: { opacity: 0 },
						animate: {
							opacity: 1,
							transition: { delay: 0.3, duration: 0.1 },
						},
						exit: { opacity: 0, transition: { duration: 0 } },
					}}
				>
					<XIcon className='size-5 text-zinc-500' />
				</MorphingDialogClose>
			</MorphingDialogContainer>
		</MorphingDialog>
	)
}

export default ImageThumbnail
