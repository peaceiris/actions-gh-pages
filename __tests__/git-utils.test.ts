import {
  copyAssets,
  setRepo,
  getUserName,
  getUserEmail,
  setCommitAuthor,
  getCommitMessage
} from '../src/git-utils';
import {getInputs} from '../src/get-inputs';
import {Inputs} from '../src/interfaces';
import {getWorkDirName, createDir} from '../src/utils';
import {CmdResult} from '../src/interfaces';
import * as exec from '@actions/exec';
import {cp, rm} from 'shelljs';
import path from 'path';
import fs from 'fs';

const testRoot = path.resolve(__dirname);

async function createTestDir(name: string): Promise<string> {
  const date = new Date();
  const unixTime = date.getTime();
  return await getWorkDirName(`${unixTime}_${name}`);
}

beforeEach(() => {
  jest.resetModules();
  process.env['GITHUB_ACTOR'] = 'default-octocat';
  process.env['GITHUB_REPOSITORY'] = 'owner/repo';
});

afterEach(() => {
  delete process.env['GITHUB_ACTOR'];
  delete process.env['GITHUB_REPOSITORY'];
});

describe('copyAssets', () => {
  let gitTempDir = '';
  (async (): Promise<void> => {
    const date = new Date();
    const unixTime = date.getTime();
    gitTempDir = await getWorkDirName(`${unixTime}_git`);
  })();

  beforeAll(async () => {
    await createDir(gitTempDir);
    process.chdir(gitTempDir);
    await exec.exec('git', ['init']);
  });

  test('copy assets from publish_dir to root, delete .github', async () => {
    const publishDir = await createTestDir('src');
    const destDir = await createTestDir('dst');
    cp('-Rf', path.resolve(testRoot, 'fixtures/publish_dir_1'), publishDir);
    cp('-Rf', gitTempDir, destDir);

    await copyAssets(publishDir, destDir, '.github');
    expect(fs.existsSync(path.resolve(destDir, '.github'))).toBeFalsy();
    expect(fs.existsSync(path.resolve(destDir, 'index.html'))).toBeTruthy();
    expect(fs.existsSync(path.resolve(destDir, 'assets/lib.css'))).toBeTruthy();
    rm('-rf', publishDir, destDir);
  });

  test('copy assets from publish_dir to root, delete .github,main.js', async () => {
    const publishDir = await createTestDir('src');
    const destDir = await createTestDir('dst');
    cp('-Rf', path.resolve(testRoot, 'fixtures/publish_dir_1'), publishDir);
    cp('-Rf', gitTempDir, destDir);

    await copyAssets(publishDir, destDir, '.github,main.js');
    expect(fs.existsSync(path.resolve(destDir, '.github'))).toBeFalsy();
    expect(fs.existsSync(path.resolve(destDir, 'index.html'))).toBeTruthy();
    expect(fs.existsSync(path.resolve(destDir, 'main.js'))).toBeFalsy();
    expect(fs.existsSync(path.resolve(destDir, 'assets/lib.css'))).toBeTruthy();
    expect(fs.existsSync(path.resolve(destDir, 'assets/lib.js'))).toBeTruthy();
    rm('-rf', publishDir, destDir);
  });

  test('copy assets from publish_dir to root, delete nothing', async () => {
    const publishDir = await createTestDir('src');
    const destDir = await createTestDir('dst');
    cp('-Rf', path.resolve(testRoot, 'fixtures/publish_dir_root'), publishDir);
    cp('-Rf', gitTempDir, destDir);

    await copyAssets(publishDir, destDir, '');
    expect(fs.existsSync(path.resolve(destDir, '.github'))).toBeTruthy();
    expect(fs.existsSync(path.resolve(destDir, 'index.html'))).toBeTruthy();
    expect(fs.existsSync(path.resolve(destDir, 'main.js'))).toBeTruthy();
    expect(fs.existsSync(path.resolve(destDir, 'assets/lib.css'))).toBeTruthy();
    expect(fs.existsSync(path.resolve(destDir, 'assets/lib.js'))).toBeTruthy();
    rm('-rf', publishDir, destDir);
  });

  test('copy assets from root to root, delete .github', async () => {
    const publishDir = await createTestDir('src');
    const destDir = await createTestDir('dst');
    cp('-Rf', path.resolve(testRoot, 'fixtures/publish_dir_root'), publishDir);
    cp('-Rf', gitTempDir, destDir);
    cp('-Rf', gitTempDir, publishDir);

    await copyAssets(publishDir, destDir, '.github');
    expect(fs.existsSync(path.resolve(destDir, '.github'))).toBeFalsy();
    expect(fs.existsSync(path.resolve(destDir, 'index.html'))).toBeTruthy();
    expect(fs.existsSync(path.resolve(destDir, 'assets/lib.css'))).toBeTruthy();
    rm('-rf', publishDir, destDir);
  });

  test('copy assets from root to root, delete nothing', async () => {
    const publishDir = await createTestDir('src');
    const destDir = await createTestDir('dst');
    cp('-Rf', path.resolve(testRoot, 'fixtures/publish_dir_root'), publishDir);
    cp('-Rf', gitTempDir, destDir);
    cp('-Rf', gitTempDir, publishDir);

    await copyAssets(publishDir, destDir, '');
    expect(fs.existsSync(path.resolve(destDir, '.github'))).toBeTruthy();
    expect(fs.existsSync(path.resolve(destDir, 'index.html'))).toBeTruthy();
    expect(fs.existsSync(path.resolve(destDir, 'assets/lib.css'))).toBeTruthy();
    rm('-rf', publishDir, destDir);
  });

  test.todo('copy assets from root to subdir, delete .github');
  test.todo('copy assets from root to subdir, delete .github,main.js');
  test.todo('copy assets from root to subdir, delete nothing');
});

describe('setRepo()', () => {
  test('throw error destination_dir should be a relative path', async () => {
    process.env['INPUT_GITHUB_TOKEN'] = 'test_github_token';
    process.env['INPUT_PUBLISH_BRANCH'] = 'gh-pages';
    process.env['INPUT_PUBLISH_DIR'] = 'public';
    process.env['INPUT_DESTINATION_DIR'] = '/subdir';
    // process.env['INPUT_EXTERNAL_REPOSITORY'] = 'user/repo';
    // process.env['INPUT_ALLOW_EMPTY_COMMIT'] = 'true';
    // process.env['INPUT_KEEP_FILES'] = 'true';
    // process.env['INPUT_FORCE_ORPHAN'] = 'true';
    // process.env['INPUT_USER_NAME'] = 'username';
    // process.env['INPUT_USER_EMAIL'] = 'github@github.com';
    // process.env['INPUT_COMMIT_MESSAGE'] = 'feat: Add new feature';
    // process.env['INPUT_FULL_COMMIT_MESSAGE'] = 'feat: Add new feature';
    // process.env['INPUT_TAG_NAME'] = 'deploy-v1.2.3';
    // process.env['INPUT_TAG_MESSAGE'] = 'Deployment v1.2.3';
    // process.env['INPUT_DISABLE_NOJEKYLL'] = 'true';
    // process.env['INPUT_CNAME'] = 'github.com';
    process.env['INPUT_EXCLUDE_ASSETS'] = '.github';
    const inps: Inputs = getInputs();
    const remoteURL = 'https://x-access-token:pat@github.com/actions/pages.git';
    const date = new Date();
    const unixTime = date.getTime();
    const workDir = await getWorkDirName(`${unixTime}`);
    await expect(setRepo(inps, remoteURL, workDir)).rejects.toThrowError(
      'destination_dir should be a relative path'
    );
  });
});

describe('getUserName()', () => {
  test('get default git user name', () => {
    const userName = '';
    const test = getUserName(userName);
    expect(test).toMatch('default-octocat');
  });

  test('get custom git user name', () => {
    const userName = 'custom-octocat';
    const test = getUserName(userName);
    expect(test).toMatch(userName);
  });
});

describe('getUserEmail()', () => {
  test('get default git user email', () => {
    const userEmail = '';
    const test = getUserEmail(userEmail);
    expect(test).toMatch('default-octocat@users.noreply.github.com');
  });

  test('get custom git user email', () => {
    const userEmail = 'custom-octocat@github.com';
    const test = getUserEmail(userEmail);
    expect(test).toMatch(userEmail);
  });
});

describe('setCommitAuthor()', () => {
  let workDirName = '';
  (async (): Promise<void> => {
    const date = new Date();
    const unixTime = date.getTime();
    workDirName = await getWorkDirName(`${unixTime}`);
  })();

  beforeEach(async () => {
    await createDir(workDirName);
    process.chdir(workDirName);
    await exec.exec('git', ['init']);
  });

  test('get default commit author', async () => {
    const userName = '';
    const userEmail = '';
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
    await setCommitAuthor(userName, userEmail);
    result.exitcode = await exec.exec('git', ['config', 'user.name'], options);
    expect(result.output).toMatch('default-octocat');
    result.exitcode = await exec.exec('git', ['config', 'user.email'], options);
    expect(result.output).toMatch('default-octocat@users.noreply.github.com');
  });

  test('get custom commit author', async () => {
    const userName = 'custom-octocat';
    const userEmail = 'custom-octocat@github.com';
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
    await setCommitAuthor(userName, userEmail);
    result.exitcode = await exec.exec('git', ['config', 'user.name'], options);
    expect(result.output).toMatch(userName);
    result.exitcode = await exec.exec('git', ['config', 'user.email'], options);
    expect(result.output).toMatch(userEmail);
  });

  test('throw error user_email is undefined', async () => {
    const userName = 'custom-octocat';
    const userEmail = '';
    await expect(setCommitAuthor(userName, userEmail)).rejects.toThrowError(
      'user_email is undefined'
    );
  });

  test('throw error user_name is undefined', async () => {
    const userName = '';
    const userEmail = 'custom-octocat@github.com';
    await expect(setCommitAuthor(userName, userEmail)).rejects.toThrowError(
      'user_name is undefined'
    );
  });
});

describe('getCommitMessage()', () => {
  test('get default message', () => {
    const test = getCommitMessage('', '', '', 'actions/pages', 'commit_hash');
    expect(test).toMatch('deploy: commit_hash');
  });

  test('get default message for external repository', () => {
    const test = getCommitMessage(
      '',
      '',
      'actions/actions.github.io',
      'actions/pages',
      'commit_hash'
    );
    expect(test).toMatch('deploy: actions/pages@commit_hash');
  });

  test('get custom message', () => {
    const test = getCommitMessage('Custom msg', '', '', 'actions/pages', 'commit_hash');
    expect(test).toMatch('Custom msg commit_hash');
  });

  test('get custom message for external repository', () => {
    const test = getCommitMessage(
      'Custom msg',
      '',
      'actions/actions.github.io',
      'actions/pages',
      'commit_hash'
    );
    expect(test).toMatch('Custom msg actions/pages@commit_hash');
  });

  test('get full custom message', () => {
    const test = getCommitMessage('', 'Full custom msg', '', 'actions/pages', 'commit_hash');
    expect(test).toMatch('Full custom msg');
  });

  test('get full custom message for external repository', () => {
    const test = getCommitMessage(
      '',
      'Full custom msg',
      'actions/actions.github.io',
      'actions/pages',
      'commit_hash'
    );
    expect(test).toMatch('Full custom msg');
  });
});
