import { getInput, info, setFailed, setOutput } from '@actions/core';
import { exec } from '@actions/exec';

/**
 * This file is the entry point for the Github Action
 * defined in this repo. Uses @vercel/ncc to convert this
 * to CommonJS & non-advanced Javascript.
 */

// Corresponds to a key for input in action.yml
const BROWSER_INPUT_KEY = 'browser';

// Backup value for input.browser
const FALLBACK_BROWSER = 'all';

// Corresponds to a key for output in action.yml
const TEST_RUNNER_OUTPUT_KEY = 'test-runner';

// Does actual running of tests
const runTests = async () => {
  try {
    const browser = getInput(BROWSER_INPUT_KEY) || FALLBACK_BROWSER;
    info(`Using browser set to "${browser}"`);

    // Read std out for use in passing to output
    let testRunnerOutput = '';
    const options = {
      listeners: {
        /**
         * Pass output back as job output
         * @param {Object} data
         */
        stdout: (data) => {
          testRunnerOutput += data.toString();
        },
      },
    };

    // Install dependencies
    if ((await exec(`yarn`, [], options)) !== 0) {
      setFailed(`Couldn't install dependencies`);
      return;
    }

    // Try testing using yarn
    if ((await exec(`yarn test ./tests`, [`browser=${browser}`], options)) !== 0) {
      setFailed('Running tests failed');
      return;
    }

    setOutput(TEST_RUNNER_OUTPUT_KEY, testRunnerOutput);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    setFailed(error.message);
  }
};

// Runs tests
void runTests();
