import { getInput, info, setFailed, setOutput, warning } from '@actions/core';
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
  const browser = getInput(BROWSER_INPUT_KEY) || FALLBACK_BROWSER;
  info(`Using browser set to "${browser}"`);

  // Read std out for use in passing to output
  let testRunnerOutput = '';
  const options = {
    listeners: {
      /**
       * Both pass it back as output and print it to the console
       * @param {Object} data
       */
      stdout: (data) => {
        const line = data.toString();
        testRunnerOutput += line;
        info(line);
      },
      /**
       * Print out std error as a warning
       * @param {Object} data
       */
      stderr: (data) => {
        const line = data.toString();
        warning(line);
      },
    },
  };

  // Install dependencies
  try {
    if ((await exec(`yarn`, [], options)) !== 0) {
      setFailed(`Couldn't install dependencies`);
      return;
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    setFailed(error.message);
    return;
  }

  // Try testing using yarn
  try {
    if ((await exec(`yarn`, [`test`, `browser=${browser}`, `./tests`], options)) !== 0) {
      setFailed('Tests failed');
      return;
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    setFailed(error.message);
    return;
  }

  setOutput(TEST_RUNNER_OUTPUT_KEY, testRunnerOutput);
};

// Runs tests
void runTests();
