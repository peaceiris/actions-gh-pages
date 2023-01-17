import * as core from '@actions/core';
import * as main from './main';

(async (): Promise<void> => {
  try {
    await main.run();
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(`Action failed with "${error.message}"`);
    } else {
      core.setFailed('unexpected error');
    }
  }
})();
