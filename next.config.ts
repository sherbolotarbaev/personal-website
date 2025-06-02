import createMDX from '@next/mdx'
import type { NextConfig } from 'next'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

const rawCodePlugin = () => (tree: any) => {
	visit(tree, 'element', node => {
		if (node.tagName === 'pre') {
			const [codeEl] = node.children
			if (codeEl.tagName === 'code') {
				node.raw = codeEl.children?.[0]?.value
			}
		}
	})

	visit(tree, 'element', node => {
		if (node.tagName === 'pre') {
			for (const child of node.children) {
				if (child.tagName === 'code') {
					child.properties['raw'] = node.raw
				}
			}
		}
	})
}

const nextConfig: NextConfig = {
	/* config options here */
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		rehypePlugins: [[rawCodePlugin], [rehypePrism, { ignoreMissing: true }]],
		remarkPlugins: [remarkGfm],
	},
})

export default withMDX(nextConfig)
