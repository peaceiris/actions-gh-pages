import {getPublishRepo, setPersonalToken, setGithubToken, setSSHKey} from '../src/set-tokens';
import {Inputs} from '../src/interfaces';

import fs from 'fs';
import * as exec from '@actions/exec';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as core from '@actions/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as io from '@actions/io';

jest.mock('@actions/exec', () => ({
  exec: jest.fn(),
  getExecOutput: jest.fn().mockReturnValue({
    stderr: '# hostname',
    stdout: 'hostinfo',
    exitCode: 0
  })
}));
jest.mock('@actions/io', () => ({
  mkdirP: jest.fn()
}));
jest.mock('@actions/core');
jest.mock('fs');
jest.mock('child_process');

beforeEach(() => {
  jest.resetModules();
});

// afterEach(() => {

// });

describe('setSSHKey()', () => {
  const createInputs = (): Inputs => ({
    DeployKey: 'DEPLOY_KEY',
    GithubToken: '',
    PersonalToken: '',
    PublishBranch: 'gh-pages',
    PublishDir: '',
    DestinationDir: '',
    ExternalRepository: '',
    AllowEmptyCommit: false,
    KeepFiles: false,
    ForceOrphan: false,
    UserName: '',
    UserEmail: '',
    CommitMessage: '',
    FullCommitMessage: '',
    TagName: '',
    TagMessage: '',
    DisableNoJekyll: false,
    CNAME: '',
    ExcludeAssets: ''
  });

  beforeEach(() => {
    jest.resetModules();
  });

  test('return correct repo address', async () => {
    const inps: Inputs = createInputs();
    const test = await setSSHKey(inps, 'owner/repo');
    expect(test).toMatch('git@github.com:owner/repo.git');
  });

  test('set known_hosts with the ssh-keyscan output if it succeeded', async () => {
    const inps: Inputs = createInputs();
    await setSSHKey(inps, 'owner/repo');

    const mockGetExecOutput = await exec.getExecOutput('');
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('known_hosts'),
      mockGetExecOutput.stderr + mockGetExecOutput.stdout
    );
  });

  test('SSH key fallbacks to default value if ssh-keyscan fails', async () => {
    const inps: Inputs = createInputs();
    (exec.getExecOutput as jest.Mock).mockImplementation(() => {
      throw new Error('error');
    });

    await setSSHKey(inps, 'owner/repo');
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('known_hosts'),
      expect.stringContaining('# github.com:22 SSH-2.0-babeld-1f0633a6')
    );
  });
});

describe('getPublishRepo()', () => {
  test('return repository name', () => {
    const test = getPublishRepo('', 'owner', 'repo');
    expect(test).toMatch('owner/repo');
  });

  test('return external repository name', () => {
    const test = getPublishRepo('extOwner/extRepo', 'owner', 'repo');
    expect(test).toMatch('extOwner/extRepo');
  });
});

describe('setGithubToken()', () => {
  test('return remote url with GITHUB_TOKEN gh-pages', () => {
    const expected = 'https://x-access-token:GITHUB_TOKEN@github.com/owner/repo.git';
    const test = setGithubToken(
      'GITHUB_TOKEN',
      'owner/repo',
      'gh-pages',
      '',
      'refs/heads/master',
      'push'
    );
    expect(test).toMatch(expected);
  });

  test('return remote url with GITHUB_TOKEN master', () => {
    const expected = 'https://x-access-token:GITHUB_TOKEN@github.com/owner/repo.git';
    const test = setGithubToken(
      'GITHUB_TOKEN',
      'owner/repo',
      'master',
      '',
      'refs/heads/source',
      'push'
    );
    expect(test).toMatch(expected);
  });

  test('return remote url with GITHUB_TOKEN gh-pages (RegExp)', () => {
    const expected = 'https://x-access-token:GITHUB_TOKEN@github.com/owner/repo.git';
    const test = setGithubToken(
      'GITHUB_TOKEN',
      'owner/repo',
      'gh-pages',
      '',
      'refs/heads/gh-pages-base',
      'push'
    );
    expect(test).toMatch(expected);
  });

  test('throw error gh-pages-base to gh-pages-base (RegExp)', () => {
    expect(() => {
      setGithubToken(
        'GITHUB_TOKEN',
        'owner/repo',
        'gh-pages-base',
        '',
        'refs/heads/gh-pages-base',
        'push'
      );
    }).toThrowError('You deploy from gh-pages-base to gh-pages-base');
  });

  test('throw error master to master', () => {
    expect(() => {
      setGithubToken('GITHUB_TOKEN', 'owner/repo', 'master', '', 'refs/heads/master', 'push');
    }).toThrowError('You deploy from master to master');
  });

  test('throw error external repository with GITHUB_TOKEN', () => {
    expect(() => {
      setGithubToken(
        'GITHUB_TOKEN',
        'owner/repo',
        'gh-pages',
        'extOwner/extRepo',
        'refs/heads/master',
        'push'
      );
    }).toThrowError(`\
The generated GITHUB_TOKEN (github_token) does not support to push to an external repository.
Use deploy_key or personal_token.
`);
  });

  test('return remote url with GITHUB_TOKEN pull_request', () => {
    const expected = 'https://x-access-token:GITHUB_TOKEN@github.com/owner/repo.git';
    const test = setGithubToken(
      'GITHUB_TOKEN',
      'owner/repo',
      'gh-pages',
      '',
      'refs/pull/29/merge',
      'pull_request'
    );
    expect(test).toMatch(expected);
  });
});

describe('setPersonalToken()', () => {
  test('return remote url with personal access token', () => {
    const expected = 'https://x-access-token:pat@github.com/owner/repo.git';
    const test = setPersonalToken('pat', 'owner/repo');
    expect(test).toMatch(expected);
  });
});
