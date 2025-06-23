'use client'

import { VariantProps } from 'class-variance-authority'

import { Button, buttonVariants } from 'ui/button'

import { Globe } from 'lucide-react'

interface ContactButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	text?: string
	icon?: React.ReactElement
	link?: string
}

export const ContactButton: React.FC<ContactButtonProps> = ({
	text = 'Email',
	icon,
	link,
	...props
}) => {
	return (
		<Button size='lg' variant='outline' link={link} target='_blank' {...props}>
			{icon || (
				<div className='bg-background dark:bg-muted p-1 rounded-sm'>
					<Globe className='text-muted-foreground' />
				</div>
			)}

			{text}
		</Button>
	)
}
