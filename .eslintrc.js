module.exports = {
	parser: 'vue-eslint-parser',
	env: {
		browser: true,
		node: true,
		es2021: true
	},
	extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	rules: {
		'prettier/prettier': 'error'
	}
}