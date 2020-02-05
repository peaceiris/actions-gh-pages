import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as github from '@actions/github';
import * as io from '@actions/io';
import path from 'path';
import fs from 'fs';
const cpSpawnSync = require('child_process').spawnSync;
const cpexec = require('child_process').execFileSync;
import {Inputs} from './interfaces';

export function getHomeDir(): string {
  let homedir = '';

  if (process.platform === 'win32') {
    homedir = process.env['USERPROFILE'] || 'C:\\';
  } else {
    homedir = `${process.env.HOME}`;
  }

  core.debug(`homeDir: ${homedir}`);

  return homedir;
}

export function setPublishRepo(insp: Inputs): string {
  if (insp.ExternalRepository) {
    return insp.ExternalRepository;
  }
  return `${github.context.repo.owner}/${github.context.repo.repo}`;
}

export async function setSSHKey(
  inps: Inputs,
  publishRepo: string
): Promise<string> {
  core.info('[INFO] setup SSH deploy key');

  const homeDir = getHomeDir();
  const sshDir = path.join(homeDir, '.ssh');
  await io.mkdirP(sshDir);
  await exec.exec('chmod', ['700', sshDir]);

  const knownHosts = path.join(sshDir, 'known_hosts');
  // ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts on Ubuntu
  const cmdSSHkeyscanOutput = `\
# github.com:22 SSH-2.0-babeld-1f0633a6
github.com ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ==
`;
  fs.writeFileSync(knownHosts, cmdSSHkeyscanOutput + '\n');
  core.info(`[INFO] wrote ${knownHosts}`);
  await exec.exec('chmod', ['600', knownHosts]);

  const idRSA = path.join(sshDir, 'github');
  fs.writeFileSync(idRSA, inps.DeployKey + '\n');
  core.info(`[INFO] wrote ${idRSA}`);
  await exec.exec('chmod', ['600', idRSA]);

  const sshConfigPath = path.join(sshDir, 'config');
  const sshConfigContent = `\
Host github
    HostName github.com
    IdentityFile ~/.ssh/github
    User git
`;
  fs.writeFileSync(sshConfigPath, sshConfigContent + '\n');
  core.info(`[INFO] wrote ${sshConfigPath}`);
  await exec.exec('chmod', ['600', sshConfigPath]);

  if (process.platform === 'win32') {
    await cpSpawnSync('Start-Process', ['powershell.exe', '-Verb', 'runas']);
    await cpSpawnSync('sh', ['-c', '\'eval "$(ssh-agent)"\''], {shell: true});
    await exec.exec('sc', ['config', 'ssh-agent', 'start=auto']);
    await exec.exec('sc', ['start', 'ssh-agent']);
  }
  await cpexec('ssh-agent', ['-a', '/tmp/ssh-auth.sock']);
  core.exportVariable('SSH_AUTH_SOCK', '/tmp/ssh-auth.sock');
  await exec.exec('ssh-add', [idRSA]);

  return `git@github.com:${publishRepo}.git`;
}

export async function setGithubToken(
  inps: Inputs,
  publishRepo: string
): Promise<string> {
  core.info('[INFO] setup GITHUB_TOKEN');

  const context = github.context;
  const payload = github.context.payload;
  core.debug(`ref: ${context.ref}`);
  core.debug(`eventName: ${context.eventName}`);
  core.debug(`private: ${payload.repository?.private}`);
  let isProhibitedBranch = false;

  const ref = context.ref;
  if (context.eventName === 'push') {
    isProhibitedBranch = ref.includes(`refs/heads/${inps.PublishBranch}`);
    if (isProhibitedBranch) {
      throw new Error(
        `You deploy from ${inps.PublishBranch} to ${inps.PublishBranch}`
      );
    }
  } else if (context.eventName === 'pull_request') {
    // TODO: support pull_request event
    throw new Error('This action does not support pull_request event now.');
  }

  const isPrivateRepository = payload.repository?.private;
  if (inps.ExternalRepository) {
    throw new Error(
      'GITHUB_TOKEN does not support to push to an external repository'
    );
  }
  if (isPrivateRepository === false) {
    core.warning(
      'GITHUB_TOKEN does not support to trigger the GitHub Pages build event on a public repository'
    );
  }

  return `https://x-access-token:${inps.GithubToken}@github.com/${publishRepo}.git`;
}

export async function setPersonalToken(
  inps: Inputs,
  publishRepo: string
): Promise<string> {
  core.info('[INFO] setup personal access token');
  return `https://x-access-token:${inps.PersonalToken}@github.com/${publishRepo}.git`;
}

export async function setTokens(inps: Inputs): Promise<string> {
  try {
    const publishRepo = setPublishRepo(inps);
    if (inps.DeployKey) {
      return setSSHKey(inps, publishRepo);
    } else if (inps.GithubToken) {
      return setGithubToken(inps, publishRepo);
    } else if (inps.PersonalToken) {
      return setPersonalToken(inps, publishRepo);
    } else {
      throw new Error('not found deploy key or tokens');
    }
  } catch (e) {
    throw new Error(e);
  }
}
