import path from 'node:path'

export default (eleventyConfig) => {
	eleventyConfig.addGlobalData('layout', 'base.liquid') // Set layout for everything.
	eleventyConfig.setDataFileSuffixes(['.config']) // Cosmetic, ex: `content.config.js`.

	// Override filter with relative URLs, for portability. (Using regular function for `this`.)
	eleventyConfig.addFilter('url', function (target) {
		const result = path.relative(this.page.url, target) || '.'
		return target.endsWith('/') ? `${result}/` : result
	})

	return {
		dir: {
			input: 'content',
			output: '_site',

			// Relative to `input`.
			data: '../data',
			includes: '../layout/include',
			layouts: '../layout',
		}
	}
}
