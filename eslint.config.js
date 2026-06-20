import { defineConfig, includeIgnoreFile } from 'eslint/config'
import { fileURLToPath } from 'node:url'

export default defineConfig([
	// Use `.gitignore`.
	includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
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
