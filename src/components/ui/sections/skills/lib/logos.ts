import {
	SiAmazondynamodb,
	SiAmazonwebservices,
	SiFastify,
	SiNestjs,
	SiNextdotjs,
	SiNodedotjs,
	SiPostgresql,
	SiPrisma,
	SiReact,
	SiSupabase,
	SiTailwindcss,
	SiTypescript,
} from 'react-icons/si'

import type { ILogo } from 'ui/logo-carousel'

function generateId(arr: Omit<ILogo, 'id'>[]): ILogo[] {
	return arr.map((logo, index) => ({ ...logo, id: index + 1 }))
}

export const logos: ILogo[] = generateId([
	// 1st row
	{ name: 'Typescript', img: SiTypescript },
	{ name: 'Nest.js', img: SiNestjs },
	{ name: 'Node.js', img: SiNodedotjs },
	{ name: 'Fastify', img: SiFastify },
	// 2nd row
	{ name: 'PostgreSQL', img: SiPostgresql },
	{ name: 'DynamoDB', img: SiAmazondynamodb },
	{ name: 'AWS', img: SiAmazonwebservices },
	{ name: 'Prisma', img: SiPrisma },
	// 3rd row
	{ name: 'React', img: SiReact },
	{ name: 'Next.js', img: SiNextdotjs },
	{ name: 'Supabase', img: SiSupabase },
	{ name: 'Tailwind', img: SiTailwindcss },
])
