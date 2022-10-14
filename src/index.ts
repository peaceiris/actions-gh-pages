import * as core from '@actions/core';
import * as main from './main';

(async (): Promise<void> => {
  try {
    await main.run();
  } catch (e: any) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();
