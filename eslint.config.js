import { defineConfig, includeIgnoreFile } from 'eslint/config'
import { fileURLToPath } from 'node:url'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))
export default defineConfig([
	includeIgnoreFile(gitignorePath, { gitignoreResolution: true }),
	{
		rules: {
			'arrow-parens': ['error', 'always'],
			'comma-dangle': ['error', 'always-multiline'],
			'indent': ['error', 'tab'],
			'no-console': 'warn',
			'prefer-const': 'error',
			'quotes': ['error', 'single'],
			'semi': ['error', 'never'],
		},
	},
])
