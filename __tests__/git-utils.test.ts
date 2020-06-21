import {getUserName, getUserEmail, setCommitAuthor, getCommitMessage} from '../src/git-utils';
import {getWorkDirName, createWorkDir} from '../src/utils';
import {CmdResult} from '../src/interfaces';
import * as exec from '@actions/exec';

beforeEach(() => {
  jest.resetModules();
  process.env['GITHUB_ACTOR'] = 'default-octocat';
  process.env['GITHUB_REPOSITORY'] = 'owner/repo';
});

afterEach(() => {
  delete process.env['GITHUB_ACTOR'];
  delete process.env['GITHUB_REPOSITORY'];
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
    await createWorkDir(workDirName);
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
