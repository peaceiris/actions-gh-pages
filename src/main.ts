import * as core from '@actions/core';
import * as exec from '@actions/exec';
import {Inputs} from './interfaces';
import {showInputs, getInputs} from './get-inputs';
import {setTokens} from './set-tokens';
import {setRepo, commit, push, pushTag} from './git-utils';
import {getWorkDirName, addNoJekyll, addCNAME} from './utils';

export async function run(): Promise<void> {
  try {
    const inps: Inputs = getInputs();
    showInputs(inps);

    const remoteURL = await setTokens(inps);
    core.debug(`[INFO] remoteURL: ${remoteURL}`);

    const date = new Date();
    const unixTime = date.getTime();
    const workDir = await getWorkDirName(`${unixTime}`);
    await setRepo(inps, remoteURL, workDir);

    await addNoJekyll(workDir, inps.DisableNoJekyll, inps.PublishBranch);
    await addCNAME(workDir, inps.CNAME);

    try {
      await exec.exec('git', ['remote', 'rm', 'origin']);
    } catch (e) {
      core.info(`[INFO] ${e.message}`);
    }
    await exec.exec('git', ['remote', 'add', 'origin', remoteURL]);
    await exec.exec('git', ['add', '--all']);
    await commit(
      inps.AllowEmptyCommit,
      inps.ExternalRepository,
      inps.CommitMessage,
      inps.UserName,
      inps.UserEmail
    );
    await push(inps.PublishBranch, inps.ForceOrphan);
    await pushTag(inps.TagName, inps.TagMessage);

    core.info('[INFO] Action successfully completed');

    return;
  } catch (e) {
    throw new Error(e.message);
  }
}
