'use client'

import type React from 'react'
import { useEffect } from 'react'

import { useModalStore } from 'lib/store'

import BottomSheet from 'ui/bottom-sheet'
import { ContactButton } from './button'
import { ContactForm } from './form'

import { socialMedia } from 'config/social-media'

export const ContactModal: React.FC = () => {
	const { isOpen, toggleModal } = useModalStore()

	useEffect(() => {
		const checkHash = () => {
			if (window.location.hash === '#contact') {
				toggleModal()
			}
		}
		checkHash()
		window.addEventListener('hashchange', checkHash)
		return () => {
			window.removeEventListener('hashchange', checkHash)
		}
	}, [])

	const handleClose = () => {
		toggleModal()
		// Remove the hash from the URL when closing the modal
		history.pushState(
			null,
			document.title,
			window.location.pathname + window.location.search
		)
	}

	if (!isOpen) {
		return null
	}

	return (
		<BottomSheet open={isOpen} onOpenChange={handleClose} title='Contact me'>
			<div className='flex flex-col gap-2.5 pt-2 pb-4'>
				<div className='px-4'>
					<ContactForm />
				</div>

				<div className='flex flex-col gap-0 py-4'>
					<div className='px-4 pb-2 text-xs font-medium tracking-wider text-muted-foreground'>
						SOCIALS
					</div>

					{socialMedia.map(({ name, href }, index) => (
						<ContactButton
							key={index}
							text={name}
							variant='outline'
							className='w-full py-6 px-4 border-0 justify-start gap-3 text-base rounded-none shadow-none hover:bg-muted-foreground/10'
							link={href}
						/>
					))}
				</div>
			</div>
		</BottomSheet>
	)
}
