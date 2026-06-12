// Recursively merge `index.js` up into its object (no extra key/level).
const promoteIndex = ({ index, ...siblings } = {}) =>
	Object.fromEntries(
		Object.entries({ ...index, ...siblings })
			.map(([key, value]) => [key, value && typeof value === 'object' ? promoteIndex(value) : value])
	)

export default {
	// Some common strings.
	school:        'Parsons',
	program:       'MPS Communication Design',
	concentration: 'Digital Product Design',

	// URLs.
	catalogUrl:     'https://courses.newschool.edu/courses/',
	applyUrl:       'https://www.newschool.edu/parsons/how-to-apply-graduate/',
	infoRequestUrl: 'https://apply.newschool.edu/register/requestinfo',

	// Derived data.
	programTitle: data => `${data.school} ${data.program}`,
	title: data => data.page.fileSlug // Use the folder name…
		.replace(/^./, initial => initial.toUpperCase()) // …capitalized.
		|| data.programTitle, // Fallback to program.

	// Remodel/sort.
	students: ({ students }) =>
		Object.entries(promoteIndex(students))
			.map(([year, studentsByName]) => [year, Object.values(studentsByName)])
			.sort(([a], [b]) => b - a) // Descending years.
}
