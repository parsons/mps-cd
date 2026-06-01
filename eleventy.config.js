export default (eleventyConfig) => {
	eleventyConfig.addGlobalData('layout', 'base.liquid')
	eleventyConfig.setFrontMatterParsingOptions({
		delimiters: ['<script data-front-matter>', '</script>'],
		language: 'js',
	})

	return {
		dir: {
			input: 'content',
			output: '_site',

			// Relative to `input`.
			layouts: '../layouts',
		}
	}
}
