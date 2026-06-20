import { defineConfig, includeIgnoreFile } from 'eslint/config'
import { fileURLToPath } from 'node:url'
import eslintPluginYml from 'eslint-plugin-yml'

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
	{
		files: ['data/**/*.{yml,yaml}'],
		extends: [eslintPluginYml.configs.recommended],
		rules: {
			'yml/file-extension': ['error', { extension: 'yaml', caseSensitive: true }],
			'yml/indent': ['error', 2, { indentBlockSequences: true }],
			'yml/no-irregular-whitespace': 'off',
			'yml/quotes': ['error', { prefer: 'single', avoidEscape: true }],
			'yml/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
		},
	},
])
