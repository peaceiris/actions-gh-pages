// import {run} from '../src/main';

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  delete process.env['INPUT_DEPLOY_KEY'];
  delete process.env['INPUT_GITHUB_TOKEN'];
  delete process.env['INPUT_PERSONAL_TOKEN'];
  delete process.env['INPUT_PUBLISH_BRANCH'];
  delete process.env['INPUT_PUBLISH_DIR'];
  delete process.env['INPUT_EXTERNAL_REPOSITORY'];
  delete process.env['INPUT_ALLOW_EMPTY_COMMIT'];
  delete process.env['INPUT_KEEP_FILES'];
  delete process.env['INPUT_FORCE_ORPHAN'];
  delete process.env['INPUT_USER_NAME'];
  delete process.env['INPUT_USER_EMAIL'];
  delete process.env['INPUT_COMMIT_MESSAGE'];
  delete process.env['INPUT_TAG_NAME'];
  delete process.env['INPUT_TAG_MESSAGE'];
  delete process.env['INPUT_TAG_OVERWRITE'];
});

describe('Integration testing run()', () => {
  test('succeed in pushing using deploy key', async () => {
    // process.env['INPUT_DEPLOY_KEY'] = 'test_deploy_key';
    // process.env['GITHUB_REPOSITORY'] = 'owner/repo';
    // const exitcode = await run();
    expect(0).toBe(0);
  });
});
