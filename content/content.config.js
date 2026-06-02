export default {
	eleventyComputed: {
		programTitle: 'Parsons MPS Communication Design',
		title: data => data.page.fileSlug // Use the folder name…
			.replace(/^./, initial => initial.toUpperCase()) // …capitalized.
			|| data.programTitle // Fallback to program.
	}
}
