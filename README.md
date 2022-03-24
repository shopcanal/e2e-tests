# End to End Tests

This repo is intended to house all the end to end tests that Canal needs to make sure the ecosystem is
working correctly. Tests are written in Typescript on the Playwright framework, but can be used to
verify behavior anywhere in the stack.

## Usage of the Github Action

There's a Github Action specified here to run the tests for a particular browser. Put this in your workflow yml file to
start using it, assuming you're keeping browser name in a `matrix` variable. If not specified, the browser will default
to all browsers. Use `main` to keep up to date against the latest E2E tests written, or a specific version to pin tests
to that version. Usually you want `main`. Github action is written in Dockerfile + action.yml + action.sh if you need
to change it.

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

## Setup

To get started, just run `yarn`. It should install and set up everything for you. It uses
Playwright's built in test runner, so ensure you're familiar with how its testing works. See
https://playwright.dev/docs/test-intro/ for more information about how it functions.

### Running tests manually

Use `yarn test` to run all tests, or `yarn test x` to run test `x.spec.ts` in the tests folder. You can add
as many tests to run as you want instead of running all them. Running all tests on all browsers can be done with
`yarn test.all`. If you need to get more specific, you can add folder names too like `yarn test shopkeep/x`, etc.

To run tests and debug with Playwright Inspector, use `yarn debug`. You'll need to comment out the `test.describe.configure({ mode: 'parallel' })` lines to be able to debug properly.

All tests will eventually be run on PRs in other repos, but for now these tests can be run alone. Test screenshots are
published as artifacts on action runs.

### Writing new tests

Add a new test file to `tests`, written in Typescript and with a `.spec.ts` ending. Screenshots should go in
`screenshots.spec.ts`, otherwise test structure is up to you and pretty flexible, as long as things stay organized.

#### Tips and Tricks

Best practices for non-flaky and easy to debug tests:

- **NO TIMEOUTS**. Period. If you find yourself waiting for an arbitrary amount of time, there's _always_ a better way to do it. Familiarize yourself with the [`page` API](https://playwright.dev/docs/api/class-page). Usually a `waitForNavigation` or `waitFor({ state: 'visible' })` on a locator clears up your issue. There's a few other tips about this below.

- Don't use things like `page.$` or `page.$$` or `page.waitForSelector` to get elements! Instead use Playwright's [`locator` objects](https://playwright.dev/docs/api/class-locator). They are executed every time they're used vs. just once when you create a selector, so they're more resilient to change + less flaky as a result. You can use these like selectors.

```typescript
const tabButton = page.locator('text=Discover');

await tabButton.click(); // simply click on the button once it's visible, for example
await tabButton.waitFor({ state: 'hidden' }); // wait for it to be hidden, for example
```

- If you need to await a navigation to a new page when there's a button click (for example), do it in a `Promise.all` so that there's no race condition between the navigation and the action that opens the new page:

```typescript
const button = page.locator('text=Hi');
await Promise.all([button.click(), page.waitForNavigation()]);
```

- But if the action opens a new tab/window instead of navigates the existing page, you capture the new page instead of waiting for navigation. Treat the new page object like you would the normal `page` variable (you can test title, url, etc, get elements, etc).

```typescript
const button = page.locator('text=Hi');
const [newPage] = await Promise.all([context.waitForEvent('page'), button.click()]);
```
