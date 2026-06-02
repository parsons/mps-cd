export default {
	eleventyComputed: {
		title: (data) => (data.title || data.page.fileSlug).replace(/^./, (char) => char.toUpperCase())
	}
}
