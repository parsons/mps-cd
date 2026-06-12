// Recursively merge index data files up into their object (no extra key/level).
const promoteIndex = ({ index, ...siblings } = {}) =>
	Object.fromEntries(
		Object.entries({ ...index, ...siblings })
			.map(([key, value]) => [key, value && typeof value === 'object' ? promoteIndex(value) : value])
	)

export default {
	title: data => data.page.fileSlug // Use the folder name…
		.replace(/^./, initial => initial.toUpperCase()) // …capitalized.
		|| `${data.text.school} ${data.text.program}`, // Fallback to school/program.

	// Remodel/sort.
	students: ({ students }) =>
		Object.entries(promoteIndex(students))
			.map(([year, studentsByName]) => [year, Object.values(studentsByName)])
			.sort(([a], [b]) => b - a), // Descending years.
}
