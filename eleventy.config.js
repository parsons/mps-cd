export default (eleventyConfig) => {
	eleventyConfig.addGlobalData('layout', 'base.liquid')
	return {
		dir: {
			input: 'content',
			output: '_site',

			// Relative to `input`.
			layouts: '../layouts',
		}
	}
}
