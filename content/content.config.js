export default {
	school:        'Parsons',
	program:       'MPS Communication Design',
	concentration: 'Digital Product Design',

	// Derived data.
	eleventyComputed: {
		programTitle: data => `${data.school} ${data.program}`,
		tags: data => data.page.url !== '/' && ['page'], // Make a collection of sub-pages.
		title: data => data.page.fileSlug // Use the folder name…
			.replace(/^./, initial => initial.toUpperCase()) // …capitalized.
			|| data.programTitle // Fallback to program.
	}
}
