import {getPublishRepo, setPersonalToken, setGithubToken} from '../src/set-tokens';

beforeEach(() => {
  jest.resetModules();
});

// afterEach(() => {

// });

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
