# End to End Tests

This repo is intended to house all the end to end tests that Canal needs to make sure the ecosystem is
working correctly. Tests are written in Typescript on the Playwright framework, but can be used to
verify behavior anywhere in the stack.

## Usage of the Github Action

There's a Github Action specified here to run the tests for a particular browser. Put this in your workflow yml file to
start using it, assuming you're keeping browser name in a `matrix` variable. If not specified, the browser will default
to all browsers. Use `main` to keep up to date against the latest E2E tests written, or a specific version to pin tests
to that version. Usually you want `main`.

```yml
steps:
  - uses: shopcanal/e2e-tests@main
    with:
      browser: ${{ matrix.browser }}
```

## Committing changes

When you make changes to the tests, the exposed Github Action will automatically
run the changes when referenced from another repo, and the internal `test.yml`
action will also run them automatically.

However, making changes to index.js (the runner for the exposed Github Action)
necessitates running `yarn package` to compile the changes using `@vercel/ncc`.
It's done for you via a Husky hook, but can be run manually to be sure. Resulting
code lands in `dist/` and should be committed with your other changes.

## Setup

To get started, just run `yarn`. It should install and set up everything for you. It uses
Playwright's built in test runner, so ensure you're familiar with how its testing works. See
https://playwright.dev/docs/test-intro/ for more information about how it functions.

### Running tests manually

Use `yarn test` to run all tests, or `yarn test tests/x` to run test `x.spec.ts` in the tests folder. You can add
as many tests to run as you want instead of running all them. Running all tests on all browsers can be done with
`yarn test.all`.

To run tests and debug with Playwright Inspector, use `yarn debug`.

All tests will eventually be run on PRs in other repos, but for now these tests can be run alone. Test screenshots are
published as artifacts on action runs.

### Writing new tests

Add a new test file to `tests`, written in Typescript and with a `.spec.ts` ending. Screenshots should go in
`screenshots.spec.ts`, otherwise test structure is up to you and pretty flexible, as long as things stay organized.
