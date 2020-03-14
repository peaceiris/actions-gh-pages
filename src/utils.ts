import {context} from '@actions/github';
import * as core from '@actions/core';
import * as io from '@actions/io';
import path from 'path';
import fs from 'fs';

export async function getHomeDir(): Promise<string> {
  let homedir = '';

  if (process.platform === 'win32') {
    homedir = process.env['USERPROFILE'] || 'C:\\';
  } else {
    homedir = `${process.env.HOME}`;
  }

  core.debug(`homeDir: ${homedir}`);

  return homedir;
}

export async function getWorkDirName(unixTime: string): Promise<string> {
  const homeDir = await getHomeDir();
  const workDirName = path.join(homeDir, `actions_github_pages_${unixTime}`);
  return workDirName;
}

export async function createWorkDir(workDirName: string): Promise<void> {
  await io.mkdirP(workDirName);
  core.debug(`Created: ${workDirName}`);
  return;
}

export async function addNoJekyll(
  workDir: string,
  DisableNoJekyll: boolean,
  PublishBranch: string
): Promise<void> {
  if (DisableNoJekyll) {
    return;
  }
  if (PublishBranch === 'master' || PublishBranch === 'gh-pages') {
    const filepath = path.join(workDir, '.nojekyll');
    if (fs.existsSync(filepath)) {
      return;
    }
    fs.closeSync(fs.openSync(filepath, 'w'));
    core.info(`[INFO] Created ${filepath}`);
  }
}

export async function addCNAME(
  workDir: string,
  content: string
): Promise<void> {
  if (content === '') {
    return;
  }
  const filepath = path.join(workDir, 'CNAME');
  if (fs.existsSync(filepath)) {
    core.warning(`CNAME already exists, skip adding CNAME`);
    return;
  }
  fs.writeFileSync(filepath, content + '\n');
  core.info(`[INFO] Created ${filepath}`);
}

export async function skipOnFork(
  githubToken: string,
  deployKey: string,
  personalToken: string
): Promise<boolean> {
  const isForkRepository =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (context.payload as any).repository.fork === 'true';

  if (!isForkRepository || githubToken) {
    return false;
  }

  if (isForkRepository && (deployKey || personalToken)) {
    return false;
  }

  return true;
}
