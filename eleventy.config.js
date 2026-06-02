import path from 'node:path'

export default (eleventyConfig) => {
	eleventyConfig.addGlobalData('layout', 'base.liquid') // Set layout for everything.
	eleventyConfig.setDataFileSuffixes(['.config']) // Cosmetic, ex: `content.config.js`.

	// Override filter with relative URLs, for portability. (Using regular function for `this`.)
	eleventyConfig.addFilter('url', function (target) {
		return path.join(path.relative(this.page.url, target), target.endsWith('/') ? '/' : '')
	})

	return {
		dir: {
			input: 'content',
			output: '_site',

			// Relative to `input`.
			includes: '../layout/include',
			layouts: '../layout',
		}
	}
}
