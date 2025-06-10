import { SiGithub, SiInstagram, SiLinkedin, SiTelegram } from 'react-icons/si'

interface ISocialMedia {
	name: string
	href: string
	icon?: React.ReactNode
}

export const socialMedia: ISocialMedia[] = [
	{
		name: 'LinkedIn',
		href: 'https://www.linkedin.com/in/sherbolotarbaev',
		icon: <SiLinkedin />,
	},
	{
		name: 'GitHub',
		href: 'https://github.com/sherbolotarbaev',
		icon: <SiGithub />,
	},

	{
		name: 'Instagram',
		href: 'https://www.instagram.com/sherbolotarbaev',
		icon: <SiInstagram />,
	},
	{
		name: 'Telegram',
		href: 'https://t.me/sherbolotarbaev',
		icon: <SiTelegram />,
	},
]
