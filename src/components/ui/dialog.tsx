'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import type React from 'react'

import { cn } from 'utils'

const Dialog: React.FC<React.ComponentProps<typeof DialogPrimitive.Root>> = ({
	...props
}) => {
	return <DialogPrimitive.Root data-slot='dialog' {...props} />
}

const DialogTrigger: React.FC<
	React.ComponentProps<typeof DialogPrimitive.Trigger>
> = ({ ...props }) => {
	return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />
}

const DialogPortal: React.FC<
	React.ComponentProps<typeof DialogPrimitive.Portal>
> = ({ ...props }) => {
	return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />
}

const DialogClose: React.FC<
	React.ComponentProps<typeof DialogPrimitive.Close>
> = ({ ...props }) => {
	return <DialogPrimitive.Close data-slot='dialog-close' {...props} />
}

const DialogOverlay: React.FC<
	React.ComponentProps<typeof DialogPrimitive.Overlay>
> = ({ className, ...props }) => {
	return (
		<DialogPrimitive.Overlay
			data-slot='dialog-overlay'
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/30',
				className
			)}
			{...props}
		/>
	)
}

const DialogContent: React.FC<
	React.ComponentProps<typeof DialogPrimitive.Content> & {
		showCloseButton?: boolean
	}
> = ({ className, children, showCloseButton = true, ...props }) => {
	return (
		<DialogPortal data-slot='dialog-portal'>
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot='dialog-content'
				className={cn(
					'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border p-4 shadow-lg duration-200 sm:max-w-lg',
					className
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot='dialog-close'
						className="data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
					>
						<XIcon />
						<span className='sr-only'>Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	)
}

const DialogHeader: React.FC<React.ComponentProps<'div'>> = ({
	className,
	...props
}) => {
	return (
		<div
			data-slot='dialog-header'
			className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
			{...props}
		/>
	)
}

const DialogFooter: React.FC<React.ComponentProps<'div'>> = ({
	className,
	...props
}) => {
	return (
		<div
			data-slot='dialog-footer'
			className={cn(
				'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
				className
			)}
			{...props}
		/>
	)
}

const DialogTitle: React.FC<
	React.ComponentProps<typeof DialogPrimitive.Title>
> = ({ className, ...props }) => {
	return (
		<DialogPrimitive.Title
			data-slot='dialog-title'
			className={cn('text-lg leading-none font-semibold', className)}
			{...props}
		/>
	)
}

const DialogDescription: React.FC<
	React.ComponentProps<typeof DialogPrimitive.Description>
> = ({ className, ...props }) => {
	return (
		<DialogPrimitive.Description
			data-slot='dialog-description'
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	)
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
}
