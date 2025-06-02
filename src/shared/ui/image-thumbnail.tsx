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

type ImageThumbnailProps = Omit<
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
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
	src,
	alt,
	aspectRatio = 16 / 9,
	className,
	...props
}) => {
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
						src={src}
						alt={alt}
						width={1280}
						height={720}
						className='w-full h-full object-cover'
						loading='lazy'
						{...props}
					/>
				</div>
			</MorphingDialogTrigger>
			<MorphingDialogContainer>
				<MorphingDialogContent className='relative rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50'>
					<div className='h-[50vh] md:h-[70vh] rounded-xl overflow-hidden'>
						<Image
							src={src}
							alt={alt}
							width={1920}
							height={1080}
							className='w-full h-full object-contain'
						/>
					</div>
				</MorphingDialogContent>
				<MorphingDialogClose
					className='fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1'
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
