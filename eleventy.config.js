import markdownIt from 'markdown-it'
import path from 'node:path'
import yaml from 'js-yaml'

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
