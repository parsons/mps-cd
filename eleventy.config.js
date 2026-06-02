export default (eleventyConfig) => {
	eleventyConfig.addGlobalData('layout', 'base.liquid') // Set layout for everything.
	eleventyConfig.setDataFileSuffixes(['.config']) // Cosmetic, ex: `content.config.js`.

	// Collection for our sub-pages.
	eleventyConfig.addCollection('page', collection => collection.getAll().filter(page => page.url !== '/'))

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
