'use client'

import type React from 'react'
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { Button } from 'ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from 'ui/form'
import { Input } from 'ui/input'
import { Textarea } from 'ui/textarea'

import { newMessage } from 'actions/contact'
import { ContactFormSchema } from 'lib/schema'
import { useModalStore } from 'lib/store'

export const ContactForm: React.FC = () => {
	const { toggleModal } = useModalStore()
	const [step, setStep] = useState<'email' | 'message'>('email')

	const form = useForm<z.infer<typeof ContactFormSchema>>({
		resolver: zodResolver(ContactFormSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: z.infer<typeof ContactFormSchema>) => {
		const result = await newMessage(data)
		if (result.status === 'success') {
			toast.success('Thank you for reaching out!', {
				duration: 5000,
				position: 'top-center',
				closeButton: true,
			})
			toggleModal()
		} else {
			toast.error(result.reason, {
				duration: 5000,
				position: 'top-center',
				closeButton: true,
			})
		}
	}

	const handleNextStep = () => {
		form.trigger('email').then(isValid => {
			if (isValid) {
				setStep('message')
			}
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full flex flex-col gap-3'
			>
				{step === 'email' && (
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type='email'
										placeholder='Email Address'
										autoComplete='email'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				{step === 'message' && (
					<>
						<p className='text-sm text-muted-foreground'>
							From: {form.getValues('email')}{' '}
							<span
								className='text-primary underline cursor-pointer'
								onClick={() => setStep('email')}
							>
								edit
							</span>
						</p>
						<FormField
							control={form.control}
							name='message'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											className='max-h-72 min-h-32'
											placeholder='Message'
											autoComplete='off'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				)}

				<div className='flex items-center justify-end flex-col-reverse gap-2 sm:flex-row'>
					{step === 'email' ? (
						<Button
							type='button'
							onClick={handleNextStep}
							// disabled={!form.formState.isValid || !form.formState.isDirty}
							className='w-full sm:w-auto'
						>
							Next
						</Button>
					) : (
						<Button
							type='submit'
							isLoading={form.formState.isSubmitting}
							disabled={
								form.formState.isSubmitting ||
								!form.formState.isValid ||
								!form.formState.isDirty
							}
							loadingText='Sending...'
							className='w-full sm:w-auto'
						>
							Send
						</Button>
					)}
				</div>
			</form>
		</Form>
	)
}
