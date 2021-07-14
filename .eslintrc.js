module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // The typescript version of no-return-await takes over to add a few okay cases
    'no-return-await': 'off',
    // This needs to be turned on to take over from `no-return-await`
    '@typescript-eslint/return-await': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['.*.ts'],
      rules: {
        // There's a typescript option `noFallthroughCasesInSwitch` that's more robust and allows for union types to have no default fallthrough. Preferred!
        'default-case': 'off',
        // Typescript makes this obsolete, as it'll warn if there's a value returned that's
        // not what's expected or vice versa
        'consistent-return': 'off',
        // There are cases where we want to only return one function from a whole file.
        'import/prefer-default-export': 'off',
      },
    },
  ],
};
