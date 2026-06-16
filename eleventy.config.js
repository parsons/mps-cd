import fs from 'node:fs'
import Image from '@11ty/eleventy-img'
import markdownIt from 'markdown-it'
import path from 'node:path'
import sharp from 'sharp'
import yaml from 'js-yaml'

// Relative URL helper.
const toRelative = (from, target) => {
	const result = path.relative(from, target) || '.'

	return target.endsWith('/') ? `${result}/` : result
}

export default (eleventyConfig) => {
	// Set common base layout for everything.
	eleventyConfig.addGlobalData('layout', 'base.liquid')

	// More ergonomic data.
	eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents))

	const markdown = markdownIt({
		breaks:      true,
		html:        true,
		linkify:     true,
		typographer: true,
	})

	// Make it available in the templates. (Using regular function for `this`.)
	eleventyConfig.addFilter('markdown', async function (content) {
		return markdown.render(await this.liquid.parseAndRender(content, this.context.environments))
	})

	// Override filter with relative URLs, for portability.
	eleventyConfig.addFilter('url', function (target) {
		return toRelative(this.page.url, target)
	})

	// Resize images.
	eleventyConfig.addAsyncShortcode('resizedImg', async function (src, size) {
		// Make sure the output directory exists!
		const outputDir = path.join(this.eleventy.directories.output, 'img')

		fs.mkdirSync(outputDir, { recursive: true })

		// `eleventy-img` sizes by width only, so get the intrinsic.
		const { width: srcWidth, height: srcHeight } = await sharp(src).metadata()

		const target = size
			? Math.round(srcHeight > srcWidth
				? size * srcWidth / srcHeight // Portrait.
				: size) // Landscape/square.
			: null // No size, use original.

		// Generate the single webp and pull its real output dimensions.
		const { url, width, height } = (await Image(src, {
			widths: [target],
			formats: ['webp'],
			outputDir,
			urlPath: '/assets/'
		})).webp[0]

		return `<img alt="" decoding="async" height="${height}" loading="lazy" src="${toRelative(this.page.url, url)}" width="${width}">`
	})

	return {
		dir: {
			input: 'pages',
			output: '_site',

			// Relative to `input`.
			data: '../data',
			includes: '../templates/components',
			layouts: '../templates',
		}
	}
}
