module.exports = {
  // In the tests folder we type check, lint, and format
  'tests/**/*.{ts,tsx}': [
    () => 'tsc',
    'eslint --cache --fix --plugin tsc --rule \'tsc/config: [2, {configFile: "./tsconfig.json"}]\' ',
    'prettier --write',
  ],
  // Outside of the project folder or in JSON/etc we just format and call it good
  '*.{ts,js,json,md,yml}': ['prettier --write'],
};
