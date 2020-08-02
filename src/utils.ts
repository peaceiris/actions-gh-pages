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

export async function createDir(dirPath: string): Promise<void> {
  await io.mkdirP(dirPath);
  core.debug(`Created directory ${dirPath}`);
  return;
}

export async function addNoJekyll(workDir: string, DisableNoJekyll: boolean): Promise<void> {
  if (DisableNoJekyll) {
    return;
  }
  const filepath = path.join(workDir, '.nojekyll');
  if (fs.existsSync(filepath)) {
    return;
  }
  fs.closeSync(fs.openSync(filepath, 'w'));
  core.info(`[INFO] Created ${filepath}`);
}

export async function addCNAME(workDir: string, content: string): Promise<void> {
  if (content === '') {
    return;
  }
  const filepath = path.join(workDir, 'CNAME');
  if (fs.existsSync(filepath)) {
    core.info(`CNAME already exists, skip adding CNAME`);
    return;
  }
  fs.writeFileSync(filepath, content + '\n');
  core.info(`[INFO] Created ${filepath}`);
}

export async function skipOnFork(
  isForkRepository: boolean,
  githubToken: string,
  deployKey: string,
  personalToken: string
): Promise<boolean> {
  if (isForkRepository) {
    if (githubToken === '' && deployKey === '' && personalToken === '') {
      return true;
    }
  }

  return false;
}
