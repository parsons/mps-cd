export default {
	// Some common strings.
	school:        'Parsons',
	program:       'MPS Communication Design',
	concentration: 'Digital Product Design',

	// Derived data.
	eleventyComputed: {
		programTitle: data => `${data.school} ${data.program}`,
		title: data => data.page.fileSlug // Use the folder name…
			.replace(/^./, initial => initial.toUpperCase()) // …capitalized.
			|| data.programTitle // Fallback to program.
	}
}
