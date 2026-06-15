import { readdirSync } from 'node:fs'

// Recursively merge index data files up into their object (no extra key/level).
const promoteIndex = ({ index, ...siblings } = {}) =>
	Object.fromEntries(
		Object.entries({ ...index, ...siblings })
			.map(([key, value]) => [key, value && typeof value === 'object' ? promoteIndex(value) : value])
	)

// Make list of per-student image files.
const imagesFor = (year, name) =>
	readdirSync(`data/students/${year}/${name}`)
		.filter(file => /\.(gif|jpe?g|png|webp)$/i.test(file))
		.map(file => `data/students/${year}/${name}/${file}`)

export default {
	title: data => data.page.fileSlug // Use the folder name…
		.replace(/^./, initial => initial.toUpperCase()) // …capitalized.
		|| `${data.text.school} ${data.text.program}`, // Fallback to school/program.

	// Remodel/get images/sort.
	students: ({ students }) =>
		Object.entries(promoteIndex(students))
			.map(([year, studentsByName]) => [
				year,
				Object.entries(studentsByName).map(([name, student]) => ({
					...student,
					project: { ...student.project, images: imagesFor(year, name) } // Add list of images.
				}))
			])
			.sort(([a], [b]) => b - a), // Descending years.
}
