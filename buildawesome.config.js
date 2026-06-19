import { imageDimensionsFromStream } from 'image-dimensions'
import fs from 'node:fs'
import Image from '@11ty/eleventy-img'
import markdownIt from 'markdown-it'
import path from 'node:path'
import yaml from 'js-yaml'

// Relative URL helper.
const toRelative = (from, target) => {
	const result = path.relative(from, target) || '.'

	return target.endsWith('/') ? `${result}/` : result
}

// Cache for faster local serving.
const outputDir = '.cache/'

export default config => {
	// Set common base layout for everything.
	config.addGlobalData('layout', 'base.liquid')

	// More ergonomic data.
	config.addDataExtension('yaml', contents => yaml.load(contents))

	const markdown = markdownIt({
		breaks:      true,
		html:        true,
		linkify:     true,
		typographer: true,
	})

	// Make it available in the templates. (Using regular functions for `this`.)
	config.addFilter('markdown', async function (content) {
		return markdown.render(await this.liquid.parseAndRender(content, this.context.environments))
	})

	// Override filter with relative URLs, for portability.
	config.addFilter('url', function (target) {
		return toRelative(this.page.url, target)
	})

	// Resize images.
	config.addAsyncShortcode('resizedImg', async function (src, size) {
		const urlPath = '/assets/'

		// `eleventy-img` sizes by width only, so get the intrinsic separately.
		const { width: srcWidth, height: srcHeight } =
			await imageDimensionsFromStream(ReadableStream.from(fs.createReadStream(src)))

		const target = size
			? Math.round(
				(srcHeight > srcWidth
					? size * srcWidth / srcHeight // Portrait.
					: size // Landscape/square.
				) * 2) // 2× for display density.
			: null // No size, use original.

		// Generate `.webp` into the persistent cache; reused across builds when unchanged.
		const { url, width, height } = (await Image(src, {
			widths: [target],
			formats: ['webp'],
			outputDir,
			urlPath,
		})).webp[0]

		return `<img alt="" decoding="async" height="${ height / 2 }" loading="lazy" src="${ toRelative(this.page.url, url) }" width="${ width / 2 }">`
	})

	// Copy cached images into the real output after each build.
	config.on('buildawesome.after', () => {
		fs.cpSync(outputDir, path.join(config.directories.output, 'assets'), { recursive: true })
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
