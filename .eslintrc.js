module.exports = {
   parser: '@babel/eslint-parser',
   // plugins: ['@babel'],
   parserOptions: {
      babelOptions: {
         configFile: './babel.config.json',
      },
   },
   env: {
      browser: true,
      node: true,
      es6: true,
   },
   extends: ['eslint:recommended', 'google'],
   rules: {
      semi: 'off',
      'comma-dangle': 'off',
      'require-jsdoc': 'off',
      indent: ['error', 3],
      'quote-props': ['off', 'always'],
      'object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
      'operator-linebreak': [
         'error',
         'after',
         { overrides: { '?': 'before', ':': 'before' } },
      ],
   },
}
