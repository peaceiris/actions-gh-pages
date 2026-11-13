import * as exec from '@actions/exec';
import fs from 'fs';
import os from 'os';
import path from 'path';
import {jest} from '@jest/globals';

const run = jest.fn(exec.exec);
jest.unstable_mockModule('@actions/exec', () => ({...exec, exec: run}));
const {setRepo} = await import('../src/git-utils');
import {Inputs} from '../src/interfaces';

const originalCwd = process.cwd();
let root: string;
let remote: string;
let workDir: string;
let inps: Inputs;
let originalHead: string;

async function git(args: string[]): Promise<string> {
  return (await exec.getExecOutput('git', args, {silent: true})).stdout.trim();
}

beforeEach(async () => {
  run.mockReset().mockImplementation(exec.exec);
  root = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'set-repo-'));
  remote = path.join(root, 'remote.git');
  workDir = path.join(root, 'work');
  const seed = path.join(root, 'seed');
  const publishDir = path.join(root, 'public');
  await fs.promises.mkdir(publishDir);
  await fs.promises.writeFile(path.join(publishDir, 'index.html'), 'new site');
  await git(['init', '--initial-branch=gh-pages', seed]);
  await fs.promises.writeFile(path.join(seed, 'old.html'), 'old site');
  await git(['-C', seed, 'add', '.']);
  await git([
    '-C',
    seed,
    '-c',
    'user.name=Test',
    '-c',
    'user.email=test@example.com',
    '-c',
    'commit.gpgsign=false',
    'commit',
    '-m',
    'Initial site'
  ]);
  originalHead = await git(['-C', seed, 'rev-parse', 'HEAD']);
  await git(['clone', '--bare', seed, remote]);
  inps = {
    DeployKey: '',
    GithubToken: '',
    PersonalToken: '',
    PublishBranch: 'gh-pages',
    PublishDir: publishDir,
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
  };
});

afterEach(async () => {
  jest.restoreAllMocks();
  process.chdir(originalCwd);
  await fs.promises.rm(root, {recursive: true, force: true});
});

test.each([false, true])('preserves existing history with keep_files=%s', async keepFiles => {
  await setRepo({...inps, KeepFiles: keepFiles}, remote, workDir);
  expect(await git(['rev-parse', 'HEAD'])).toBe(originalHead);
  expect(fs.readFileSync(path.join(workDir, 'index.html'), 'utf8')).toBe('new site');
  expect(fs.existsSync(path.join(workDir, 'old.html'))).toBe(keepFiles);
});

test.each([false, true])(
  'creates an orphan only for an absent branch, same-name tag=%s',
  async tag => {
    if (tag) await git(['--git-dir', remote, 'tag', 'new-pages', originalHead]);
    await setRepo({...inps, PublishBranch: 'new-pages', DestinationDir: 'site'}, remote, workDir);
    expect(await git(['symbolic-ref', 'HEAD'])).toBe('refs/heads/new-pages');
    expect(
      (
        await exec.getExecOutput('git', ['rev-parse', '--verify', 'HEAD'], {
          silent: true,
          ignoreReturnCode: true
        })
      ).exitCode
    ).not.toBe(0);
    expect(fs.readFileSync(path.join(workDir, 'site/index.html'), 'utf8')).toBe('new site');
  }
);

test.each([1, 128])('stops on remote query exit code %s', async exitCode => {
  run.mockResolvedValue(exitCode);
  await expect(setRepo(inps, remote, workDir)).rejects.toThrow(`exit code ${exitCode}`);
  expect(run).toHaveBeenCalledTimes(1);
  expect(fs.existsSync(workDir)).toBe(false);
});

test.each(['Permission denied (publickey)', 'Could not resolve host'])(
  'propagates remote query errors: %s',
  async message => {
    const failure = new Error(message);
    run.mockRejectedValue(failure);
    await expect(setRepo(inps, remote, workDir)).rejects.toBe(failure);
    expect(run).toHaveBeenCalledTimes(1);
    expect(fs.existsSync(workDir)).toBe(false);
  }
);

test('stops when the remote repository cannot be accessed', async () => {
  await expect(setRepo(inps, path.join(root, 'missing.git'), workDir)).rejects.toThrow(
    'exit code 128'
  );
  expect(fs.existsSync(workDir)).toBe(false);
});

test.each(['clone', 'rm'])('propagates %s failures without creating an orphan', async command => {
  const originalExec = exec.exec;
  const failure = new Error(`${command} failed`);
  run.mockImplementation(async (cmd, args, options) => {
    if (args?.[0] === command) throw failure;
    return originalExec(cmd, args, options);
  });
  await expect(setRepo(inps, remote, workDir)).rejects.toBe(failure);
  expect(run.mock.calls.some(([, args]) => args?.includes('--orphan'))).toBe(false);
});

test('propagates local copy failure without replacing existing history', async () => {
  const failure = new Error('copy failed');
  jest.spyOn(fs.promises, 'cp').mockRejectedValue(failure);
  await expect(setRepo(inps, remote, workDir)).rejects.toBe(failure);
  expect(run.mock.calls.some(([, args]) => args?.includes('--orphan'))).toBe(false);
  expect(await git(['-C', workDir, 'rev-parse', 'HEAD'])).toBe(originalHead);
});

test('explicit force_orphan still bypasses the remote query', async () => {
  await setRepo({...inps, ForceOrphan: true}, path.join(root, 'missing.git'), workDir);
  expect(run.mock.calls.some(([, args]) => args?.[0] === 'ls-remote')).toBe(false);
  expect(await git(['symbolic-ref', 'HEAD'])).toBe('refs/heads/gh-pages');
  expect(fs.readFileSync(path.join(workDir, 'index.html'), 'utf8')).toBe('new site');
});
