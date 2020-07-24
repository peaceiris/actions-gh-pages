import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import path from 'path';
import fs from 'fs';
import {Inputs, CmdResult} from './interfaces';
import {createDir} from './utils';

export async function createBranchForce(branch: string): Promise<void> {
  await exec.exec('git', ['init']);
  await exec.exec('git', ['checkout', '--orphan', branch]);
  return;
}

export async function copyAssets(publishDir: string, destDir: string): Promise<void> {
  const copyOpts = {recursive: true, force: true};
  const files = fs.readdirSync(publishDir);
  core.debug(`${files}`);
  for await (const file of files) {
    if (file.endsWith('.git') || file.endsWith('.github')) {
      continue;
    }
    const filePublishPath = path.join(publishDir, file);
    const fileDestPath = path.join(destDir, file);
    await io.cp(filePublishPath, fileDestPath, copyOpts);
    core.info(`[INFO] copy ${file}`);
  }

  return;
}

export async function setRepo(inps: Inputs, remoteURL: string, workDir: string): Promise<void> {
  const publishDir = path.isAbsolute(inps.PublishDir)
    ? inps.PublishDir
    : path.join(`${process.env.GITHUB_WORKSPACE}`, inps.PublishDir);

  if (path.isAbsolute(inps.DestinationDir)) {
    throw new Error('destination_dir should be a relative path');
  }
  const destDir = ((): string => {
    if (inps.DestinationDir === '') {
      return workDir;
    } else {
      return path.join(workDir, inps.DestinationDir);
    }
  })();

  core.info(`[INFO] ForceOrphan: ${inps.ForceOrphan}`);
  if (inps.ForceOrphan) {
    await createDir(destDir);
    process.chdir(workDir);
    await createBranchForce(inps.PublishBranch);
    await copyAssets(publishDir, destDir);
    return;
  }

  const result: CmdResult = {
    exitcode: 0,
    output: ''
  };
  const options = {
    listeners: {
      stdout: (data: Buffer): void => {
        result.output += data.toString();
      }
    }
  };

  try {
    result.exitcode = await exec.exec(
      'git',
      ['clone', '--depth=1', '--single-branch', '--branch', inps.PublishBranch, remoteURL, workDir],
      options
    );
    if (result.exitcode === 0) {
      await createDir(destDir);
      process.chdir(destDir);

      if (inps.DestinationDir !== '') {
        if (inps.KeepFiles) {
          core.info('[INFO] Keep existing files');
        } else {
          core.info(`[INFO] clean up ${destDir}`);
          await exec.exec('git', ['rm', '-r', '--ignore-unmatch', '*']);
        }
      } else {
        if (inps.KeepFiles) {
          core.info('[INFO] Keep existing files');
        } else {
          core.info(`[INFO] clean up ${destDir}`);
          await exec.exec('git', ['rm', '-r', '--ignore-unmatch', '*']);
        }
      }

      await copyAssets(publishDir, destDir);
      process.chdir(workDir);
      return;
    } else {
      throw new Error(`Failed to clone remote branch ${inps.PublishBranch}`);
    }
  } catch (e) {
    core.info(`[INFO] first deployment, create new branch ${inps.PublishBranch}`);
    core.info(e.message);
    await createDir(destDir);
    process.chdir(workDir);
    await createBranchForce(inps.PublishBranch);
    await copyAssets(publishDir, destDir);
    return;
  }
}

export function getUserName(userName: string): string {
  if (userName) {
    return userName;
  } else {
    return `${process.env.GITHUB_ACTOR}`;
  }
}

export function getUserEmail(userEmail: string): string {
  if (userEmail) {
    return userEmail;
  } else {
    return `${process.env.GITHUB_ACTOR}@users.noreply.github.com`;
  }
}

export async function setCommitAuthor(userName: string, userEmail: string): Promise<void> {
  if (userName && !userEmail) {
    throw new Error('user_email is undefined');
  }
  if (!userName && userEmail) {
    throw new Error('user_name is undefined');
  }
  await exec.exec('git', ['config', 'user.name', getUserName(userName)]);
  await exec.exec('git', ['config', 'user.email', getUserEmail(userEmail)]);
}

export function getCommitMessage(
  msg: string,
  fullMsg: string,
  extRepo: string,
  baseRepo: string,
  hash: string
): string {
  const msgHash = ((): string => {
    if (extRepo) {
      return `${baseRepo}@${hash}`;
    } else {
      return hash;
    }
  })();

  const subject = ((): string => {
    if (fullMsg) {
      return fullMsg;
    } else if (msg) {
      return `${msg} ${msgHash}`;
    } else {
      return `deploy: ${msgHash}`;
    }
  })();

  return subject;
}

export async function commit(allowEmptyCommit: boolean, msg: string): Promise<void> {
  try {
    if (allowEmptyCommit) {
      await exec.exec('git', ['commit', '--allow-empty', '-m', `${msg}`]);
    } else {
      await exec.exec('git', ['commit', '-m', `${msg}`]);
    }
  } catch (e) {
    core.info('[INFO] skip commit');
    core.debug(`[INFO] skip commit ${e.message}`);
  }
}

export async function push(branch: string, forceOrphan: boolean): Promise<void> {
  if (forceOrphan) {
    await exec.exec('git', ['push', 'origin', '--force', branch]);
  } else {
    await exec.exec('git', ['push', 'origin', branch]);
  }
}

export async function pushTag(tagName: string, tagMessage: string): Promise<void> {
  if (tagName === '') {
    return;
  }

  let msg = '';
  if (tagMessage) {
    msg = tagMessage;
  } else {
    msg = `Deployment ${tagName}`;
  }

  await exec.exec('git', ['tag', '-a', `${tagName}`, '-m', `${msg}`]);
  await exec.exec('git', ['push', 'origin', `${tagName}`]);
}
