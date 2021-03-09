import {setPersonalToken, setGithubToken} from '../src/set-tokens';

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = {...OLD_ENV};
});

afterAll(() => {
  process.env = OLD_ENV; // Restore old environment
});

describe('setGithubToken()', () => {
  test('return remote url with GITHUB_TOKEN gh-pages', () => {
    process.env.GITHUB_SERVER_URL = 'https://github.enterprise.server';
    const expected = 'https://x-access-token:GITHUB_TOKEN@github.enterprise.server/owner/repo.git';
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
});

describe('setPersonalToken()', () => {
  test('return remote url with personal access token', () => {
    process.env.GITHUB_SERVER_URL = 'https://github.enterprise.server';
    const expected = 'https://x-access-token:pat@github.enterprise.server/owner/repo.git';
    const test = setPersonalToken('pat', 'owner/repo');
    expect(test).toMatch(expected);
  });
});
