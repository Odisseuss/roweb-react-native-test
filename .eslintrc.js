module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'react-native/react-native': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-native/all'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly',
	},
	'parser': '@babel/eslint-parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true,
		},
		'ecmaVersion': 2020,
		'sourceType': 'module',
	},
	'root': true,
	'plugins': [
		'react',
		'react-native'
	],
	'rules': {
		// General rules
		'no-unused-vars': ['error', {
			'vars': 'all',
			'args': 'after-used',
			'ignoreRestSiblings': false,
		}],
		'no-multiple-empty-lines': ['error', { 'max': 1, }],
		'indent': ['error', 'tab', { 'SwitchCase': 1, 'ignoredNodes': ['TemplateLiteral'], }],
		'linebreak-style': ['error', 'windows'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'comma-dangle': ['error', {
			'arrays': 'never',
			'objects': 'always',
			'imports': 'always',
			'exports': 'always',
			'functions': 'never',
		}],
		'eqeqeq': ['error', 'always'],
		'no-var': ['error'],
		'prefer-arrow-callback': ['error'],
		'no-useless-return': ['error'],
		'max-len': ['warn', {
			'code': 240,
			'tabWidth': 4,
			'ignoreUrls': true,
			'ignoreTrailingComments': true,
			'ignoreStrings': true,
			'ignoreTemplateLiterals': true,
			'ignoreRegExpLiterals': true,
		}],
		'no-console': ['error'],
		'no-case-declarations': 'off',
		// React rules
		'react/destructuring-assignment': ['error', 'always'],
		'react/no-deprecated': ['error'],
		'react/no-direct-mutation-state': ['error'],
		'react/no-multi-comp': ['error'],
		'react/no-redundant-should-component-update': ['error'],
		'react/no-typos': ['error'],
		'react/no-unescaped-entities': ['error'],
		'react/no-unsafe': ['error'],
		'react/no-unused-state': ['error'],
		'react/prefer-es6-class': ['warn'],
		'react/prefer-read-only-props': ['error'],
		'react/react-in-jsx-scope': ['error'],
		'react/require-render-return': ['error'],
		'react/state-in-constructor': ['error'],
		'react/jsx-curly-spacing': [2, {
			'when': 'always',
			'spacing': {
				'objectLiterals': 'never',
			},
		}],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-key': ['error'],
		'react/jsx-no-bind': ['error'],
		'react/jsx-no-duplicate-props': ['error'],
		'react/jsx-no-target-blank': ['error'],
		'react/jsx-no-undef': ['error'],
		'react/jsx-no-useless-fragment': ['error'],
		'react/jsx-props-no-multi-spaces': ['error'],
		'react/jsx-props-no-spreading': ['warn'],
		'react/prop-types': ['off'],
		'react/jsx-max-props-per-line': ['error', { 'maximum': 1, }],
		'react/jsx-no-comment-textnodes': ['error'],
		'react/jsx-newline': ['error', {
			'prevent': true,
		}],
		'arrow-parens': ['error', 'as-needed'],
		'template-curly-spacing': ['off'],
		// 'react-native/no-raw-text': ['error', 1],
	},
};
