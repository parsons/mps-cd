import { existsSync, readdirSync } from 'node:fs'

// Recursively merge index data files up into their object (no extra key/level).
const promoteIndex = ({ index, ...siblings } = {}) =>
	Object.fromEntries(
		Object.entries({ ...index, ...siblings })
			.map(([key, value]) => [key, value && typeof value === 'object' ? promoteIndex(value) : value])
	)

// Add projects and their images from subfolders, if they have them.
const addProjects = (year, name, student) => {
	const isProject = value => value && typeof value === 'object' // Only works if there aren’t other objects!

	const imageExtension = /\.(gif|jpe?g|png|webp)$/i

	const entries = Object.entries(student)
	const keys = Object.fromEntries(entries.filter(([, value]) => !isProject(value)))

	const projects = entries
		.filter(([, value]) => isProject(value))
		.map(([slug, project]) => {
			const path = `data/students/${year}/${name}/${slug}`
			const images = (existsSync(path) ? readdirSync(path) : [])
				.filter(file => imageExtension.test(file)).map(file => `${path}/${file}`)

			return { ...project, ...(images.length && { images }) }
		})

	return projects.length ? { ...keys, projects } : keys
}

export default {
	title: data => data.page.fileSlug // Use the folder name…
		.replace(/^./, initial => initial.toUpperCase()) // …capitalized.
		|| `${data.text.school} ${data.text.program}`, // Fallback to school/program.

	// Sort, remodel.
	students: ({ students }) =>
		Object.entries(promoteIndex(students))
			.sort(([a], [b]) => b - a) // Descending years.
			.map(([year, byName]) => ({
				year,
				students: Object.entries(byName).map(([name, student]) => addProjects(year, name, student))
			})),

	// Projects by year.
	projects: ({ students }) =>
		students.map(({ year, students: people }) => ({
			year,
			projects: people.flatMap(({ projects, ...student }) =>
				(projects ?? []).map(project => ({ ...project, student })) // Project as parent, student child.
			)
		})),

	// Print the data-cascade for debuggin’
	// _debug: data => {
	// 	if (data.page.url === '/') console.dir(data, { depth: null })
	// 	return null
	// }
}
