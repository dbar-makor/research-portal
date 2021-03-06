module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'react/prop-types': 'off',
	},
};
