import { RenderPlugin } from "@11ty/eleventy"
import path from 'node:path'
import yaml from 'js-yaml'

export default (eleventyConfig) => {
	// Set common base layout for everything.
	eleventyConfig.addGlobalData('layout', 'base.liquid')

	// More ergonomic data.
	eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents))

	// Access built-in rendering filters template-side.
	eleventyConfig.addPlugin(RenderPlugin)

	// Override filter with relative URLs, for portability. (Using regular function for `this`.)
	eleventyConfig.addFilter('url', function (target) {
		const result = path.relative(this.page.url, target) || '.'
		return target.endsWith('/') ? `${result}/` : result
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
