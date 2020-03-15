import path from 'path';
import fs from 'fs';
import {
  getHomeDir,
  getWorkDirName,
  createWorkDir,
  addNoJekyll,
  addCNAME,
  skipOnFork
} from '../src/utils';

beforeEach(() => {
  jest.resetModules();
});

// afterEach(() => {

// });

async function getTime(): Promise<string> {
  const date = new Date();
  const unixTime = date.getTime();
  return `${unixTime}`;
}

describe('getHomeDir()', () => {
  test('get home directory name', async () => {
    let test = '';
    if (process.platform === 'win32') {
      test = 'C:\\Users\\runneradmin';
    } else {
      test = `${process.env.HOME}`;
    }
    const expected = await getHomeDir();
    expect(test).toMatch(expected);
  });
});

describe('getWorkDirName()', () => {
  test('get work directory name', async () => {
    let home = '';
    if (process.platform === 'win32') {
      home = 'C:\\Users\\runneradmin';
    } else {
      home = `${process.env.HOME}`;
    }
    const unixTime = await getTime();
    const expected = path.join(home, `actions_github_pages_${unixTime}`);
    const test = await getWorkDirName(`${unixTime}`);
    expect(test).toMatch(expected);
  });
});

describe('createWorkDir()', () => {
  test('create work directory', async () => {
    const unixTime = await getTime();
    const workDirName = await getWorkDirName(`${unixTime}`);
    await createWorkDir(workDirName);
    const test = fs.existsSync(workDirName);
    expect(test).toBe(true);
  });
});

async function getWorkDir(): Promise<string> {
  const unixTime = await getTime();
  let workDir = '';
  workDir = await getWorkDirName(`${unixTime}`);
  await createWorkDir(workDir);
  return workDir;
}

describe('addNoJekyll()', () => {
  test('add .nojekyll gh-pages', async () => {
    let workDir = '';
    (async (): Promise<void> => {
      workDir = await getWorkDir();
    })();
    const filepath = path.join(workDir, '.nojekyll');

    await addNoJekyll(workDir, false, 'gh-pages');
    const test = fs.existsSync(filepath);
    expect(test).toBe(true);

    fs.unlinkSync(filepath);
  });

  test('add .nojekyll master', async () => {
    let workDir = '';
    (async (): Promise<void> => {
      workDir = await getWorkDir();
    })();
    const filepath = path.join(workDir, '.nojekyll');

    await addNoJekyll(workDir, false, 'master');
    const test = fs.existsSync(filepath);
    expect(test).toBe(true);

    fs.unlinkSync(filepath);
  });

  test('.nojekyll already exists', async () => {
    let workDir = '';
    (async (): Promise<void> => {
      workDir = await getWorkDir();
    })();
    const filepath = path.join(workDir, '.nojekyll');
    fs.closeSync(fs.openSync(filepath, 'w'));

    await addNoJekyll(workDir, false, 'master');
    const test = fs.existsSync(filepath);
    expect(test).toBe(true);

    fs.unlinkSync(filepath);
  });

  test('not add .nojekyll disable_nojekyll gh-pages', async () => {
    let workDir = '';
    (async (): Promise<void> => {
      workDir = await getWorkDir();
    })();
    const filepath = path.join(workDir, '.nojekyll');

    await addNoJekyll(workDir, true, 'gh-pages');
    const test = fs.existsSync(filepath);
    expect(test).toBe(false);
  });

  test('not add .nojekyll disable_nojekyll master', async () => {
    let workDir = '';
    (async (): Promise<void> => {
      workDir = await getWorkDir();
    })();
    const filepath = path.join(workDir, '.nojekyll');

    await addNoJekyll(workDir, true, 'master');
    const test = fs.existsSync(filepath);
    expect(test).toBe(false);
  });

  test('not add .nojekyll other-branch', async () => {
    let workDir = '';
    (async (): Promise<void> => {
      workDir = await getWorkDir();
    })();
    const filepath = path.join(workDir, '.nojekyll');

    await addNoJekyll(workDir, false, 'other-branch');
    const test = fs.existsSync(filepath);
    expect(test).toBe(false);
  });

  test('not add .nojekyll disable_nojekyll other-branch', async () => {
    let workDir = '';
    (async (): Promise<void> => {
      workDir = await getWorkDir();
    })();
    const filepath = path.join(workDir, '.nojekyll');

    await addNoJekyll(workDir, true, 'other-branch');
    const test = fs.existsSync(filepath);
    expect(test).toBe(false);
  });
});

describe('addCNAME()', () => {
  test('add CNAME', async () => {
    let workDir = '';
    (async (): Promise<void> => {
      workDir = await getWorkDir();
    })();
    const filepath = path.join(workDir, 'CNAME');

    await addCNAME(workDir, 'github.com');
    const test = fs.readFileSync(filepath, 'utf8');
    expect(test).toMatch('github.com');

    fs.unlinkSync(filepath);
  });

  test('do nothing', async () => {
    let workDir = '';
    (async (): Promise<void> => {
      workDir = await getWorkDir();
    })();
    const filepath = path.join(workDir, 'CNAME');

    await addCNAME(workDir, '');
    const test = fs.existsSync(filepath);
    expect(test).toBe(false);
  });

  test('CNAME already exists', async () => {
    let workDir = '';
    (async (): Promise<void> => {
      workDir = await getWorkDir();
    })();
    const filepath = path.join(workDir, 'CNAME');

    await addCNAME(workDir, 'github.io');
    await addCNAME(workDir, 'github.com');
    const test = fs.readFileSync(filepath, 'utf8');
    expect(test).toMatch('github.io');

    fs.unlinkSync(filepath);
  });
});

describe('skipOnFork()', () => {
  test('return false on upstream', async () => {
    const test = await skipOnFork(false, 'token', '', '');
    expect(test).toBeFalsy();
  });

  test('return false on fork with github_token', async () => {
    const test = await skipOnFork(true, 'token', '', '');
    expect(test).toBeFalsy();
  });

  test('return false on fork with deploy_key', async () => {
    const test = await skipOnFork(true, '', 'deploy_key', '');
    expect(test).toBeFalsy();
  });

  test('return false on fork with personal_token', async () => {
    const test = await skipOnFork(true, '', '', 'personal_token');
    expect(test).toBeFalsy();
  });

  test('return true on fork with no tokens', async () => {
    const test = await skipOnFork(true, '', '', '');
    expect(test).toBeTruthy();
  });
});
