'use client'

import {
	AnimatePresence,
	motion,
	MotionConfig,
	Transition,
	Variant,
} from 'motion/react'
import type React from 'react'
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from 'react'
import { createPortal } from 'react-dom'

import { useOnClickOutside } from 'hooks/use-on-click-outside'
import { cn } from 'utils'

import { XIcon } from 'lucide-react'

export interface MorphingDialogContextType {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	uniqueId: string
	triggerRef: React.RefObject<HTMLDivElement>
}

const MorphingDialogContext = createContext<MorphingDialogContextType | null>(
	null
)

function useMorphingDialog() {
	const context = useContext(MorphingDialogContext)
	if (!context) {
		throw new Error(
			'useMorphingDialog must be used within a MorphingDialogProvider'
		)
	}
	return context
}

export interface MorphingDialogProviderProps {
	children: React.ReactNode
	transition?: Transition
}

const MorphingDialogProvider: React.FC<MorphingDialogProviderProps> = ({
	children,
	transition,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const uniqueId = useId()
	const triggerRef = useRef<HTMLDivElement>(null!)

	const contextValue = useMemo(
		() => ({
			isOpen,
			setIsOpen,
			uniqueId,
			triggerRef,
		}),
		[isOpen, uniqueId]
	)

	return (
		<MorphingDialogContext.Provider value={contextValue}>
			<MotionConfig transition={transition}>{children}</MotionConfig>
		</MorphingDialogContext.Provider>
	)
}

export interface MorphingDialogProps {
	children: React.ReactNode
	transition?: Transition
}

const MorphingDialog: React.FC<MorphingDialogProps> = ({
	children,
	transition,
}) => {
	return (
		<MorphingDialogProvider>
			<MotionConfig transition={transition}>{children}</MotionConfig>
		</MorphingDialogProvider>
	)
}

export interface MorphingDialogTriggerProps {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
	triggerRef?: React.RefObject<HTMLDivElement>
}

const MorphingDialogTrigger: React.FC<MorphingDialogTriggerProps> = ({
	children,
	className,
	style,
	triggerRef,
}) => {
	const { setIsOpen, isOpen, uniqueId } = useMorphingDialog()

	const handleClick = useCallback(() => {
		setIsOpen(!isOpen)
	}, [isOpen, setIsOpen])

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault()
				setIsOpen(!isOpen)
			}
		},
		[isOpen, setIsOpen]
	)

	return (
		<motion.div
			ref={triggerRef}
			layoutId={`dialog-${uniqueId}`}
			className={cn('relative cursor-pointer', className)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			style={style}
			role='button'
			aria-haspopup='dialog'
			aria-expanded={isOpen}
			aria-controls={`motion-ui-morphing-dialog-content-${uniqueId}`}
			aria-label={`Open dialog ${uniqueId}`}
		>
			{children}
		</motion.div>
	)
}

export interface MorphingDialogContentProps {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
}

const MorphingDialogContent: React.FC<MorphingDialogContentProps> = ({
	children,
	className,
	style,
}) => {
	const { setIsOpen, isOpen, uniqueId, triggerRef } = useMorphingDialog()
	const containerRef = useRef<HTMLDivElement>(null!)
	const [firstFocusableElement, setFirstFocusableElement] =
		useState<HTMLElement | null>(null)
	const [lastFocusableElement, setLastFocusableElement] =
		useState<HTMLElement | null>(null)

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false)
			}
			if (event.key === 'Tab') {
				if (!firstFocusableElement || !lastFocusableElement) return

				if (event.shiftKey) {
					if (document.activeElement === firstFocusableElement) {
						event.preventDefault()
						lastFocusableElement.focus()
					}
				} else {
					if (document.activeElement === lastFocusableElement) {
						event.preventDefault()
						firstFocusableElement.focus()
					}
				}
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [setIsOpen, firstFocusableElement, lastFocusableElement])

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('overflow-hidden')
			const focusableElements = containerRef.current?.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
			if (focusableElements && focusableElements.length > 0) {
				setFirstFocusableElement(focusableElements[0] as HTMLElement)
				setLastFocusableElement(
					focusableElements[focusableElements.length - 1] as HTMLElement
				)
				;(focusableElements[0] as HTMLElement).focus()
			}
		} else {
			document.body.classList.remove('overflow-hidden')
			triggerRef.current?.focus()
		}
	}, [isOpen, triggerRef])

	useOnClickOutside(containerRef, () => {
		if (isOpen) {
			setIsOpen(false)
		}
	})

	return (
		<motion.div
			ref={containerRef}
			layoutId={`dialog-${uniqueId}`}
			className={cn('overflow-hidden', className)}
			style={style}
			role='dialog'
			aria-modal='true'
			aria-labelledby={`motion-ui-morphing-dialog-title-${uniqueId}`}
			aria-describedby={`motion-ui-morphing-dialog-description-${uniqueId}`}
		>
			{children}
		</motion.div>
	)
}

export interface MorphingDialogContainerProps {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
}

const MorphingDialogContainer: React.FC<MorphingDialogContainerProps> = ({
	children,
}) => {
	const { isOpen, uniqueId } = useMorphingDialog()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		return () => setMounted(false)
	}, [])

	if (!mounted) return null

	return createPortal(
		<AnimatePresence initial={false} mode='sync'>
			{isOpen && (
				<>
					<motion.div
						key={`backdrop-${uniqueId}`}
						className='fixed inset-0 h-full w-full bg-white/40 backdrop-blur-sm dark:bg-black/40'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					/>
					<div className='fixed inset-0 z-50 flex items-center justify-center'>
						{children}
					</div>
				</>
			)}
		</AnimatePresence>,
		document.body
	)
}

export interface MorphingDialogTitleProps {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
}

const MorphingDialogTitle: React.FC<MorphingDialogTitleProps> = ({
	children,
	className,
	style,
}) => {
	const { uniqueId } = useMorphingDialog()

	return (
		<motion.div
			layoutId={`dialog-title-container-${uniqueId}`}
			className={className}
			style={style}
			layout
		>
			{children}
		</motion.div>
	)
}

export interface MorphingDialogSubtitleProps {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
}

const MorphingDialogSubtitle: React.FC<MorphingDialogSubtitleProps> = ({
	children,
	className,
	style,
}) => {
	const { uniqueId } = useMorphingDialog()

	return (
		<motion.div
			layoutId={`dialog-subtitle-container-${uniqueId}`}
			className={className}
			style={style}
		>
			{children}
		</motion.div>
	)
}

export interface MorphingDialogDescriptionProps {
	children: React.ReactNode
	className?: string
	disableLayoutAnimation?: boolean
	variants?: {
		initial: Variant
		animate: Variant
		exit: Variant
	}
}

const MorphingDialogDescription: React.FC<MorphingDialogDescriptionProps> = ({
	children,
	className,
	variants,
	disableLayoutAnimation,
}) => {
	const { uniqueId } = useMorphingDialog()

	return (
		<motion.div
			key={`dialog-description-${uniqueId}`}
			layoutId={
				disableLayoutAnimation
					? undefined
					: `dialog-description-content-${uniqueId}`
			}
			variants={variants}
			className={className}
			initial='initial'
			animate='animate'
			exit='exit'
			id={`dialog-description-${uniqueId}`}
		>
			{children}
		</motion.div>
	)
}

export interface MorphingDialogImageProps {
	src: string
	alt: string
	className?: string
	style?: React.CSSProperties
}

const MorphingDialogImage: React.FC<MorphingDialogImageProps> = ({
	src,
	alt,
	className,
	style,
}) => {
	const { uniqueId } = useMorphingDialog()

	return (
		<motion.img
			src={src}
			alt={alt}
			className={cn(className)}
			layoutId={`dialog-img-${uniqueId}`}
			style={style}
		/>
	)
}

export interface MorphingDialogCloseProps {
	children?: React.ReactNode
	className?: string
	variants?: {
		initial: Variant
		animate: Variant
		exit: Variant
	}
}

const MorphingDialogClose: React.FC<MorphingDialogCloseProps> = ({
	children,
	className,
	variants,
}) => {
	const { setIsOpen, uniqueId } = useMorphingDialog()

	const handleClose = useCallback(() => {
		setIsOpen(false)
	}, [setIsOpen])

	return (
		<motion.button
			onClick={handleClose}
			type='button'
			aria-label='Close dialog'
			key={`dialog-close-${uniqueId}`}
			className={cn('absolute top-6 right-6', className)}
			initial='initial'
			animate='animate'
			exit='exit'
			variants={variants}
		>
			{children || <XIcon size={24} />}
		</motion.button>
	)
}

export {
	MorphingDialog,
	MorphingDialogClose,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogDescription,
	MorphingDialogImage,
	MorphingDialogSubtitle,
	MorphingDialogTitle,
	MorphingDialogTrigger,
}
