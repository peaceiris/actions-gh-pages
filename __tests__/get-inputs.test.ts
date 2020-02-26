// import * as main from '../src/main';
import {Inputs} from '../src/interfaces';
import {showInputs, getInputs} from '../src/get-inputs';
import os from 'os';

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
  delete process.env['INPUT_DISABLE_NOJEKYLL'];
  delete process.env['INPUT_CNAME'];
});

// Assert that process.stdout.write calls called only with the given arguments.
// cf. https://github.com/actions/toolkit/blob/8b0300129f08728419263b016de8630f1d426d5f/packages/core/__tests__/core.test.ts
function assertWriteCalls(calls: string[]): void {
  expect(process.stdout.write).toHaveBeenCalledTimes(calls.length);

  for (let i = 0; i < calls.length; i++) {
    expect(process.stdout.write).toHaveBeenNthCalledWith(i + 1, calls[i]);
  }
}

function setTestInputs(): void {
  process.env['INPUT_PUBLISH_BRANCH'] = 'master';
  process.env['INPUT_PUBLISH_DIR'] = 'out';
  process.env['INPUT_EXTERNAL_REPOSITORY'] = 'user/repo';
  process.env['INPUT_ALLOW_EMPTY_COMMIT'] = 'true';
  process.env['INPUT_KEEP_FILES'] = 'true';
  process.env['INPUT_FORCE_ORPHAN'] = 'true';
  process.env['INPUT_USER_NAME'] = 'username';
  process.env['INPUT_USER_EMAIL'] = 'github@github.com';
  process.env['INPUT_COMMIT_MESSAGE'] = 'feat: Add new feature';
  process.env['INPUT_TAG_NAME'] = 'deploy-v1.2.3';
  process.env['INPUT_TAG_MESSAGE'] = 'Deployment v1.2.3';
  process.env['INPUT_DISABLE_NOJEKYLL'] = 'true';
  process.env['INPUT_CNAME'] = 'github.com';
}

function getInputsLog(authMethod: string, inps: Inputs): string {
  return `\
[INFO] ${authMethod}: true
[INFO] PublishBranch: ${inps.PublishBranch}
[INFO] PublishDir: ${inps.PublishDir}
[INFO] ExternalRepository: ${inps.ExternalRepository}
[INFO] AllowEmptyCommit: ${inps.AllowEmptyCommit}
[INFO] KeepFiles: ${inps.KeepFiles}
[INFO] ForceOrphan: ${inps.ForceOrphan}
[INFO] UserName: ${inps.UserName}
[INFO] UserEmail: ${inps.UserEmail}
[INFO] CommitMessage: ${inps.CommitMessage}
[INFO] TagName: ${inps.TagName}
[INFO] TagMessage: ${inps.TagMessage}
[INFO] DisableNoJekyll: ${inps.DisableNoJekyll}
[INFO] CNAME: ${inps.CNAME}
`;
}

describe('showInputs()', () => {
  beforeEach(() => {
    process.stdout.write = jest.fn();
  });

  test('print all inputs DeployKey', () => {
    process.env['INPUT_DEPLOY_KEY'] = 'test_deploy_key';
    setTestInputs();

    const inps: Inputs = getInputs();
    showInputs(inps);

    const authMethod = 'DeployKey';
    const test = getInputsLog(authMethod, inps);
    assertWriteCalls([`${test}${os.EOL}`]);
  });

  test('print all inputs GithubToken', () => {
    process.env['INPUT_GITHUB_TOKEN'] = 'test_github_token';
    setTestInputs();

    const inps: Inputs = getInputs();
    showInputs(inps);

    const authMethod = 'GithubToken';
    const test = getInputsLog(authMethod, inps);
    assertWriteCalls([`${test}${os.EOL}`]);
  });

  test('print all inputs PersonalToken', () => {
    process.env['INPUT_PERSONAL_TOKEN'] = 'test_personal_token';
    setTestInputs();

    const inps: Inputs = getInputs();
    showInputs(inps);

    const authMethod = 'PersonalToken';
    const test = getInputsLog(authMethod, inps);
    assertWriteCalls([`${test}${os.EOL}`]);
  });
});

describe('getInputs()', () => {
  test('get default inputs', () => {
    process.env['INPUT_DEPLOY_KEY'] = 'test_deploy_key';
    // process.env['INPUT_GITHUB_TOKEN'] = 'test_github_token';
    // process.env['INPUT_PERSONAL_TOKEN'] = 'test_personal_token';
    process.env['INPUT_PUBLISH_BRANCH'] = 'gh-pages';
    process.env['INPUT_PUBLISH_DIR'] = 'public';

    const inps: Inputs = getInputs();

    expect(inps.DeployKey).toMatch('test_deploy_key');
    expect(inps.GithubToken).toMatch('');
    expect(inps.PersonalToken).toMatch('');
    expect(inps.PublishBranch).toMatch('gh-pages');
    expect(inps.PublishDir).toMatch('public');
    expect(inps.ExternalRepository).toMatch('');
    expect(inps.AllowEmptyCommit).toBe(false);
    expect(inps.KeepFiles).toBe(false);
    expect(inps.ForceOrphan).toBe(false);
    expect(inps.UserName).toMatch('');
    expect(inps.UserEmail).toMatch('');
    expect(inps.CommitMessage).toMatch('');
    expect(inps.TagName).toMatch('');
    expect(inps.TagMessage).toMatch('');
    expect(inps.DisableNoJekyll).toBe(false);
    expect(inps.CNAME).toMatch('');
  });

  test('get spec inputs', () => {
    // process.env['INPUT_DEPLOY_KEY'] = 'test_deploy_key';
    process.env['INPUT_GITHUB_TOKEN'] = 'test_github_token';
    process.env['INPUT_PERSONAL_TOKEN'] = 'test_personal_token';
    process.env['INPUT_PUBLISH_BRANCH'] = 'master';
    process.env['INPUT_PUBLISH_DIR'] = 'out';
    process.env['INPUT_EXTERNAL_REPOSITORY'] = 'user/repo';
    process.env['INPUT_ALLOW_EMPTY_COMMIT'] = 'true';
    process.env['INPUT_KEEP_FILES'] = 'true';
    process.env['INPUT_FORCE_ORPHAN'] = 'true';
    process.env['INPUT_USER_NAME'] = 'username';
    process.env['INPUT_USER_EMAIL'] = 'github@github.com';
    process.env['INPUT_COMMIT_MESSAGE'] = 'feat: Add new feature';
    process.env['INPUT_TAG_NAME'] = 'deploy-v1.2.3';
    process.env['INPUT_TAG_MESSAGE'] = 'Deployment v1.2.3';
    process.env['INPUT_DISABLE_NOJEKYLL'] = 'true';
    process.env['INPUT_CNAME'] = 'github.com';

    const inps: Inputs = getInputs();

    expect(inps.DeployKey).toMatch('');
    expect(inps.GithubToken).toMatch('test_github_token');
    expect(inps.PersonalToken).toMatch('test_personal_token');
    expect(inps.PublishBranch).toMatch('master');
    expect(inps.PublishDir).toMatch('out');
    expect(inps.ExternalRepository).toMatch('user/repo');
    expect(inps.AllowEmptyCommit).toBe(true);
    expect(inps.KeepFiles).toBe(true);
    expect(inps.ForceOrphan).toBe(true);
    expect(inps.UserName).toMatch('username');
    expect(inps.UserEmail).toMatch('github@github.com');
    expect(inps.CommitMessage).toMatch('feat: Add new feature');
    expect(inps.TagName).toMatch('deploy-v1.2.3');
    expect(inps.TagMessage).toMatch('Deployment v1.2.3');
    expect(inps.DisableNoJekyll).toBe(true);
    expect(inps.CNAME).toMatch('github.com');
  });
});
