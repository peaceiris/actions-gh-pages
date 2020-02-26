import {getPublishRepo, setPersonalToken} from '../src/set-tokens';

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

describe('setPersonalToken()', () => {
  test('set personal token', () => {
    const expected = 'https://x-access-token:pat@github.com/owner/repo.git';
    const test = setPersonalToken('pat', 'owner/repo');
    expect(test).toMatch(expected);
  });
});
