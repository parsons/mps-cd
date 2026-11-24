import { imageDimensionsFromStream } from 'image-dimensions'
import { load } from 'js-yaml'
import { RenderPlugin } from '@awesome.me/buildawesome'
import fs from 'node:fs'
import Image from '@11ty/eleventy-img'
import markdownIt from 'markdown-it'
import path from 'node:path'

// Relative URL helper.
const toRelative = (from, target) => {
	const result = path.relative(from, target) || '.'

	return target.endsWith('/') ? `${result}/` : result
}

// Cache for faster local serving.
const outputDir = '.cache/'

export default (config) => {
	config.setServerOptions({ host: '0.0.0.0' }) // Allow local IP/hostname for `--serve`.

	// Set common base layout for everything.
	config.addGlobalData('layout', 'base.liquid')

	config.addPassthroughCopy('assets/reset.css')

	// Try to future-proof `styles.liquid` for eventual rename:
	// https://github.com/11ty/eleventy-plugin-bundle/blob/main/src/BundlePlucker.js#L8-L12
	config.addBundle('css', {
		bundleHtmlContentFromSelector: 'style[buildawesome:bucket="components"]',
		toFileDirectory: 'assets',
	})

	// Full rebuilds are needed for re-bundling.
	config.addWatchTarget('**/*.css', { resetConfig: true })
	config.addWatchTarget('**/*.js', { resetConfig: true })

	config.addPlugin(RenderPlugin) // To render out bundled CSS.
	config.addExtension('css', { compile: (content) => () => content }) // Read CSS as-is with `renderFile`.

	// More ergonomic data.
	config.addDataExtension('yaml', (contents) => load(contents))

	const markdown = markdownIt({
		breaks:      true,
		html:        true,
		linkify:     true,
		typographer: true,
	})

	markdown.linkify.set({ fuzzyLink: true }) // Allow “fuzzy” links, ex: example.com

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
		},
	}
}
