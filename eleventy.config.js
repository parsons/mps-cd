export default (eleventyConfig) => {
	eleventyConfig.addGlobalData('layout', 'base.liquid')
	eleventyConfig.setDataFileSuffixes(['.config']) // Cosmetic, ex: `content.config.js`.

	return {
		dir: {
			input: 'content',
			output: '_site',

			// Relative to `input`.
			layouts: '../layout',
		}
	}
}
