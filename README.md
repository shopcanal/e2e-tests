# End to End Tests

This repo is intended to house all the end to end tests that Canal needs to make sure the ecosystem is
working correctly. Tests are written in Typescript on the Playwright framework, but can be used to
verify behavior anywhere in the stack.

## Setup

To get started, just run `yarn`. It should install and set up everything for you. It uses
Playwright's built in test runner, so ensure you're familiar with how its testing works. See
https://playwright.dev/docs/test-intro/ for more information about how it functions.

## Running tests

Use `yarn test` to run all tests, or `yarn test tests/x` to run test `x.spec.ts` in the tests folder. You can add
as many tests to run as you want instead of running all them. Running all tests on all browsers can be done with
`yarn test.all`.

To run tests and debug with Playwright Inspector, use `yarn debug`.

All tests will eventually be run on PRs in other repos, but for now these tests can be run alone.

## Writing tests

Add a new test file to `tests`, written in Typescript and with a `.spec.ts` ending. Screenshots should go in
`screenshots.spec.ts`, otherwise test structure is up to you and pretty flexible, as long as things stay organized.
