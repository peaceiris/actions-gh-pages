import * as core from '@actions/core';
import {Inputs} from './interfaces';

function showInputs(inps: Inputs): void {
  if (inps.DeployKey) {
    core.info(`[INFO] DeployKey: true`);
  } else if (inps.GithubToken) {
    core.info(`[INFO] GithubToken: true`);
  } else if (inps.PersonalToken) {
    core.info(`[INFO] PersonalToken: true`);
  }

  core.info(`[INFO] PublishBranch: ${inps.PublishBranch}`);
  core.info(`[INFO] PublishDir: ${inps.PublishDir}`);
  core.info(`[INFO] ExternalRepository: ${inps.ExternalRepository}`);
  core.info(`[INFO] AllowEmptyCommit: ${inps.AllowEmptyCommit}`);
  core.info(`[INFO] KeepFiles: ${inps.KeepFiles}`);
  core.info(`[INFO] ForceOrphan: ${inps.ForceOrphan}`);
  core.info(`[INFO] UserEmail: ${inps.UserEmail}`);
  core.info(`[INFO] UserEmail: ${inps.UserEmail}`);
  core.info(`[INFO] CommitMessage: ${inps.CommitMessage}`);
  core.info(`[INFO] TagName: ${inps.TagName}`);
  core.info(`[INFO] TagMessage: ${inps.TagMessage}`);
}

export function getInputs(): Inputs {
  const inps: Inputs = {
    DeployKey: core.getInput('deploy_key'),
    GithubToken: core.getInput('github_token'),
    PersonalToken: core.getInput('personal_token'),
    PublishBranch: core.getInput('publish_branch'),
    PublishDir: core.getInput('publish_dir'),
    ExternalRepository: core.getInput('external_repository'),
    AllowEmptyCommit:
      (core.getInput('allow_empty_commit') || 'false').toUpperCase() === 'TRUE',
    KeepFiles:
      (core.getInput('keep_files') || 'false').toUpperCase() === 'TRUE',
    ForceOrphan:
      (core.getInput('force_orphan') || 'false').toUpperCase() === 'TRUE',
    UserName: core.getInput('user_name'),
    UserEmail: core.getInput('user_email'),
    CommitMessage: core.getInput('commit_message'),
    TagName: core.getInput('tag_name'),
    TagMessage: core.getInput('tag_message')
  };

  showInputs(inps);

  return inps;
}
