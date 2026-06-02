export default (eleventyConfig) => {
	eleventyConfig.addGlobalData('layout', 'base.liquid')
	eleventyConfig.setDataFileSuffixes(['.config'])

	return {
		dir: {
			input: 'content',
			output: '_site',

			// Relative to `input`.
			layouts: '../layouts',
		}
	}
}
