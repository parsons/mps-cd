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

	// Remodel `students` object from folder structure, flattening the last level (info.js) out.
	students: ({ students }) =>
		Object.entries(students)
			.map(([year, group]) => [year, Object.values(group).map(({ info }) => info)])
			.sort(([a], [b]) => b - a) // Descending years.

}
