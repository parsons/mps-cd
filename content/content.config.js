export default {
	eleventyComputed: {
		programTitle: 'Parsons MPS Communication Design',
		tags: data => data.page.url !== '/' && ['page'], // Make a collection of sub-pages.
		title: data => data.page.fileSlug // Use the folder name…
			.replace(/^./, initial => initial.toUpperCase()) // …capitalized.
			|| data.programTitle // Fallback to program.
	}
}
