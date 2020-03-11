import {
  getUserName,
  getUserEmail,
  getCommitAuthor,
  commit
} from '../src/git-utils';

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

describe('getCommitAuthor()', () => {
  test('get default commit author', () => {
    const userName = '';
    const userEmail = '';
    const test = getCommitAuthor(userName, userEmail);
    expect(test).toMatch(
      'default-octocat <default-octocat@users.noreply.github.com>'
    );
  });

  test('get custom commit author', () => {
    const userName = 'custom-octocat';
    const userEmail = 'custom-octocat@github.com';
    const test = getCommitAuthor(userName, userEmail);
    expect(test).toMatch(`${userName} <${userEmail}>`);
  });

  test('throw error user_email is undefined', () => {
    const userName = 'custom-octocat';
    const userEmail = '';
    expect(() => {
      getCommitAuthor(userName, userEmail);
    }).toThrowError('user_email is undefined');
  });

  test('throw error user_name is undefined', () => {
    const userName = '';
    const userEmail = 'custom-octocat@github.com';
    expect(() => {
      getCommitAuthor(userName, userEmail);
    }).toThrowError('user_name is undefined');
  });
});

describe('commit()', () => {
  test('throw error user_email is undefined', async () => {
    const userName = 'custom-octocat';
    const userEmail = '';
    await expect(
      commit(false, '', '', userName, userEmail)
    ).rejects.toThrowError('user_email is undefined');
  });

  test('throw error user_name is undefined', async () => {
    const userName = '';
    const userEmail = 'custom-octocat@github.com';
    await expect(
      commit(false, '', '', userName, userEmail)
    ).rejects.toThrowError('user_name is undefined');
  });
});
