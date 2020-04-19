[![license](https://img.shields.io/github/license/peaceiris/actions-gh-pages.svg)](https://github.com/peaceiris/actions-gh-pages/blob/master/LICENSE)
[![release](https://img.shields.io/github/release/peaceiris/actions-gh-pages.svg)](https://github.com/peaceiris/actions-gh-pages/releases/latest)
[![GitHub release date](https://img.shields.io/github/release-date/peaceiris/actions-gh-pages.svg)](https://github.com/peaceiris/actions-gh-pages/releases)
![Test](https://github.com/peaceiris/actions-gh-pages/workflows/Test/badge.svg?branch=master&event=push)
[![CodeFactor](https://www.codefactor.io/repository/github/peaceiris/actions-gh-pages/badge)](https://www.codefactor.io/repository/github/peaceiris/actions-gh-pages)
[![Release Feed](https://img.shields.io/badge/release-feed-yellow)](https://github.com/peaceiris/actions-gh-pages/releases.atom)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=peaceiris/actions-gh-pages)](https://dependabot.com)

<img width="400" alt="GitHub Actions for deploying to GitHub Pages with Static Site Generators" src="./images/ogp.svg">

This Action has been migrated to a TypeScript Action (version 3).
The old Docker Action is [peaceiris/actions-gh-pages@v2](https://github.com/peaceiris/actions-gh-pages/tree/v2)



## GitHub Actions for GitHub Pages

This is a **GitHub Action** to deploy your static files to **GitHub Pages**.
This deploy action can be combined simply and freely with [Static Site Generators]. (Hugo, MkDocs, Gatsby, GitBook, mdBook, etc.)

[Static Site Generators]: https://www.staticgen.com/

The next example step will deploy `./public` directory to the remote `gh-pages` branch.


```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./public
```

### Supported Tokens

Three tokens are supported.

| Token | Private repo | Public repo | Protocol | Setup |
|---|:---:|:---:|---|---|
| `github_token` | ✅️ | ✅️ | HTTPS | Unnecessary |
| `deploy_key` | ✅️ | ✅️ | SSH | Necessary |
| `personal_token` | ✅️ | ✅️ | HTTPS | Necessary |

Notes: Actually, the `GITHUB_TOKEN` works for deploying to GitHub Pages but it has still some limitations. For the first deployment, we need to select the `gh-pages` branch or `master` branch on the repository settings tab. See [First Deployment with `GITHUB_TOKEN`](#%EF%B8%8F-first-deployment-with-github_token)

### Supported Platforms

| runs-on | `github_token` | `deploy_key` | `personal_token` |
|---|:---:|:---:|:---:|
| ubuntu-18.04 | ✅️ | ✅️ | ✅️ |
| macos-latest | ✅️ | ✅️ | ✅️ |
| windows-latest | ✅️ | (2) | ✅️ |

2. WIP, See [Issue #87](https://github.com/peaceiris/actions-gh-pages/issues/87)



## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Getting started](#getting-started)
  - [⭐️ Repository type - Project](#%EF%B8%8F-repository-type---project)
  - [⭐️ Repository type - User and Organization](#%EF%B8%8F-repository-type---user-and-organization)
- [Options](#options)
  - [⭐️ `github_token`](#%EF%B8%8F-github_token)
  - [⭐️ `deploy_key`](#%EF%B8%8F-deploy_key)
  - [⭐️ `personal_token`](#%EF%B8%8F-personal_token)
  - [⭐️ `publish_branch`](#%EF%B8%8F-publish_branch)
  - [⭐️ `publish_dir`](#%EF%B8%8F-publish_dir)
  - [⭐️ CNAME](#%EF%B8%8F-cname)
  - [⭐️ Enable Built-in Jekyll](#%EF%B8%8F-enable-built-in-jekyll)
  - [⭐️ Allow empty commits](#%EF%B8%8F-allow-empty-commits)
  - [⭐️ Keeping existing files](#%EF%B8%8F-keeping-existing-files)
  - [⭐️ Deploy to external repository](#%EF%B8%8F-deploy-to-external-repository)
  - [⭐️ Force orphan](#%EF%B8%8F-force-orphan)
  - [⭐️ Set Git username and email](#%EF%B8%8F-set-git-username-and-email)
  - [⭐️ Set custom commit message](#%EF%B8%8F-set-custom-commit-message)
  - [⭐️ Create Git tag](#%EF%B8%8F-create-git-tag)
- [Tips and FAQ](#tips-and-faq)
  - [⭐️ Create SSH Deploy Key](#%EF%B8%8F-create-ssh-deploy-key)
  - [⭐️ First Deployment with `GITHUB_TOKEN`](#%EF%B8%8F-first-deployment-with-github_token)
  - [⭐️ Use the latest and specific release](#%EF%B8%8F-use-the-latest-and-specific-release)
- [Examples](#examples)
  - [⭐️ Static Site Generators with Node.js](#%EF%B8%8F-static-site-generators-with-nodejs)
  - [⭐️ Gatsby](#%EF%B8%8F-gatsby)
  - [⭐️ React and Next](#%EF%B8%8F-react-and-next)
  - [⭐️ Vue and Nuxt](#%EF%B8%8F-vue-and-nuxt)
  - [⭐️ Docusaurus](#%EF%B8%8F-docusaurus)
  - [⭐️ Static Site Generators with Python](#%EF%B8%8F-static-site-generators-with-python)
  - [⭐️ mdBook (Rust)](#%EF%B8%8F-mdbook-rust)
  - [⭐️ Flutter Web](#%EF%B8%8F-flutter-web)
  - [⭐️ Elm](#%EF%B8%8F-elm)
  - [⭐️ github/personal-website](#%EF%B8%8F-githubpersonal-website)
  - [⭐️ Swift Publish](#%EF%B8%8F-swift-publish)
- [License](#license)
- [Maintainer](#maintainer)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## Getting started

### ⭐️ Repository type - Project

Add your workflow file `.github/workflows/gh-pages.yml` and push to the remote master branch.

An example workflow for Hugo.

- [peaceiris/actions-hugo: GitHub Actions for Hugo](https://github.com/peaceiris/actions-hugo)

[![peaceiris/actions-hugo - GitHub](https://gh-card.dev/repos/peaceiris/actions-hugo.svg?fullname)](https://github.com/peaceiris/actions-hugo)

```yaml
name: github pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true  # Fetch Hugo themes
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.68.3'

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

The above example is for [Project Pages sites]. (`<username>/<project_name>` repository)

| Actions log overview | GitHub Pages log |
|---|---|
| ![](./images/log_overview.jpg) | ![](./images/log_success.jpg) |

### ⭐️ Repository type - User and Organization

For [User and Organization Pages sites] (`<username>/<username>.github.io` repository),
we have to set `master` branch to `publish_branch`.

A default value of `publish_branch` is `gh-pages`.

```yaml
on:
  push:
    branches:
      - source  # default branch

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - run: somebuild

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          publish_branch: master  # deploying branch
```

[Project Pages sites]: https://help.github.com/en/articles/user-organization-and-project-pages#project-pages-sites
[User and Organization Pages sites]: https://help.github.com/en/articles/user-organization-and-project-pages#user-and-organization-pages-sites

![Change default branch](./images/default-branch.jpg)
![Change default branch](./images/user_repo.jpg)

<div align="right">
<a href="#table-of-contents">Back to TOC ☝️</a>
</div>



## Options

### ⭐️ `github_token`

**This option is for `GITHUB_TOKEN`, not a personal access token.**

GitHub Actions runner automatically creates a `GITHUB_TOKEN` secret to use in your workflow. You can use the `GITHUB_TOKEN` to authenticate in a workflow run.

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./public
```

For more details about `GITHUB_TOKEN`: [Authenticating with the GITHUB_TOKEN - GitHub Help](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token)

### ⭐️ `deploy_key`

Read [Create SSH Deploy Key](#%EF%B8%8F-create-ssh-deploy-key), create your SSH deploy key, and set the `deploy_key` option like the following.

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
    publish_dir: ./public
```

### ⭐️ `personal_token`

[Generate a personal access token (`repo`)](https://github.com/settings/tokens) and add it to Secrets as `PERSONAL_TOKEN`, it works as well as `ACTIONS_DEPLOY_KEY`.


```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    personal_token: ${{ secrets.PERSONAL_TOKEN }}
    publish_dir: ./public
```

### ⭐️ `publish_branch`

A target branch to deploy to GitHub Pages. The default is `gh-pages`.

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_branch: master  # default: gh-pages
```

### ⭐️ `publish_dir`

A target directory to deploy to GitHub Pages. The default is `public`.

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./out  # default: public
```

### ⭐️ CNAME

To add `CNAME` file, we can set the `cname` option.

For more details about `CNAME`, read the official documentation: [Managing a custom domain for your GitHub Pages site - GitHub Help](https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site)

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./public
    cname: github.com
```

### ⭐️ Enable Built-in Jekyll

If you want GitHub Pages to process your site with the static site generator Jekyll, set `enable_jekyll` to true.

[github/personal-website](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-githubpersonal-website) is one of the examples using GitHub Pages built-in Jekyll.

By default, this action signals to GitHub Pages that the site shall not be processed with Jekyll. This is done by adding an empty `.nojekyll` file when publishing to the master or gh-pages branch. When a `.nojekyll` file already exists, this action does nothing.

Bypassing Jekyll makes the deployment faster and is necessary if you are deploying files or directories that start with underscores, since Jekyll considers these to be special resources and does not copy them to the final site. You only need to set `enable_jekyll` to true when you want to deploy a Jekyll-powered website and let GitHub Pages do the Jekyll processing.


```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./public
    enable_jekyll: true
```

For more details about `.nojekyll`: [Bypassing Jekyll on GitHub Pages - The GitHub Blog](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/)

### ⭐️ Allow empty commits

By default, a commit will not be generated when no file changes. If you want to allow an empty commit, set the optional parameter `allow_empty_commit` to `true`.

For example:

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./public
    allow_empty_commit: true
```

### ⭐️ Keeping existing files

By default, existing files in the publish branch are removed before adding the ones from publish dir. If you want the action to add new files but leave existing ones untouched, set the optional parameter `keep_files` to `true`.

For example:

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./public
    keep_files: true
```

### ⭐️ Deploy to external repository

By default, your files are published to the repository which is running this action.
If you want to publish to another repository on GitHub, set the environment variable `external_repository` to `<username>/<external-repository>`.

For example:

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
    external_repository: username/external-repository
    publish_branch: master
    publish_dir: ./public
```

You can use `deploy_key` or `personal_token`.
When you use `deploy_key`, set your private key to the repository which includes this action and set your public key to your external repository.

Be careful, `GITHUB_TOKEN` has no permission to access to external repositories.

### ⭐️ Force orphan

We can set the `force_orphan: true` option.
This allows you to make your publish branch with only the latest commit.

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./public
    force_orphan: true
```

### ⭐️ Set Git username and email

Set custom `git config user.name` and `git config user.email`.
A commit is always created with the same user.

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./public
    user_name: 'github-actions[bot]'
    user_email: 'github-actions[bot]@users.noreply.github.com'
```

<img width="400px" alt="Add GitHub Actions bot as a committer" src="./images/committer_github_actions_bot.jpg">

### ⭐️ Set custom commit message

Set custom commit message.
When we create a commit with a message `docs: Update some post`, a deployment commit will be generated with a message `docs: Update some post ${GITHUB_SHA}`.

```yaml
- name: Deploy
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./public
    commit_message: ${{ github.event.head_commit.message }}
```

### ⭐️ Create Git tag

Here is an example workflow.

```yaml
name: github pages

on:
  push:
    branches:
      - master
    tags:
      - 'v*.*.*'

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Some build

      - name: Prepare tag
        id: prepare_tag
        if: startsWith(github.ref, 'refs/tags/')
        run: |
          TAG_NAME="${GITHUB_REF##refs/tags/}"
          echo "::set-output name=tag_name::${TAG_NAME}"
          echo "::set-output name=deploy_tag_name::deploy-${TAG_NAME}"

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          tag_name: ${{ steps.prepare_tag.outputs.deploy_tag_name }}
          tag_message: 'Deployment ${{ steps.prepare_tag.outputs.tag_name }}'
```

Commands on a local machine.

```console
$ # On the master branch
$ git tag -a "v1.2.3" -m "Release v1.2.3"
$ git push origin "v1.2.3"

$ # After deployment
$ git fetch origin
$ git tag
deploy-v1.2.3  # Tag on the gh-pages branch
v1.2.3         # Tag on the master branch
```

<div align="right">
<a href="#table-of-contents">Back to TOC ☝️</a>
</div>



## Tips and FAQ

### ⭐️ Create SSH Deploy Key

Generate your deploy key with the following command.

```sh
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
# You will get 2 files:
#   gh-pages.pub (public key)
#   gh-pages     (private key)
```

Next, Go to **Repository Settings**

- Go to **Deploy Keys** and add your public key with the **Allow write access**
- Go to **Secrets** and add your private key as `ACTIONS_DEPLOY_KEY`

| Add your public key | Success |
|---|---|
| ![](./images/deploy-keys-1.jpg) | ![](./images/deploy-keys-2.jpg) |

| Add your private key | Success |
|---|---|
| ![](./images/secrets-1.jpg) | ![](./images/secrets-2.jpg) |

### ⭐️ First Deployment with `GITHUB_TOKEN`

The `GITHUB_TOKEN` has limitations for the first deployment so we have to select the GitHub Pages branch on the repository settings tab.

| First deployment failed | Go to the settings tab |
|---|---|
| ![](./images/log_first_deployment_failed_with_github_token.jpg) | ![](./images/settings_inactive.jpg) |

| Select branch | Deploying again and succeed |
|---|---|
| ![](./images/settings_select.jpg) | ![](./images/log_success.jpg) |

### ⭐️ Use the latest and specific release

We recommend you to use the latest and specific release of this action for stable CI/CD.
It is useful to watch this repository (release only) to check the [latest release] of this action.

[latest release]: https://github.com/peaceiris/actions-gh-pages/releases

<div align="right">
<a href="#table-of-contents">Back to TOC ☝️</a>
</div>



## Examples

### ⭐️ Static Site Generators with Node.js

[hexo], [gitbook], [vuepress], [react-static], [gridsome], and so on.

[hexo]: https://github.com/hexojs/hexo
[gitbook]: https://github.com/GitbookIO/gitbook
[vuepress]: https://github.com/vuejs/vuepress
[react-static]: https://github.com/react-static/react-static
[gridsome]: https://github.com/gridsome/gridsome

Premise: Dependencies are managed by `package.json` and `package-lock.json`

```yaml
name: github pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v1
        with:
          node-version: '12.x'

      - name: Cache dependencies
        uses: actions/cache@v1
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - run: npm ci
      - run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

### ⭐️ Gatsby

An example for [Gatsby] (Gatsby.js) project with [gatsby-starter-blog]

[Gatsby]: https://github.com/gatsbyjs/gatsby
[gatsby-starter-blog]: https://github.com/gatsbyjs/gatsby-starter-blog

```yaml
name: github pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v1
        with:
          node-version: '12.x'

      - name: Cache dependencies
        uses: actions/cache@v1
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - run: npm ci
      - run: npm run format
      - run: npm run test
      - run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

### ⭐️ React and Next

An example for [Next.js] (React.js) project with [create-next-app]

- cf. [Deploying a Next.js app into GitHub Pages · zeit/next.js Wiki](https://github.com/zeit/next.js/wiki/Deploying-a-Next.js-app-into-GitHub-Pages)

[Next.js]: https://github.com/zeit/next.js
[create-next-app]: https://nextjs.org/docs

```yaml
name: github pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v1
        with:
          node-version: '12.x'

      - name: Get yarn cache
        id: yarn-cache
        run: echo "::set-output name=dir::$(yarn cache dir)"

      - name: Cache dependencies
        uses: actions/cache@v1
        with:
          path: ${{ steps.yarn-cache.outputs.dir }}
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      - run: yarn install
      - run: yarn build
      - run: yarn export

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### ⭐️ Vue and Nuxt

An example for [Nuxt.js] (Vue.js) project with [create-nuxt-app]

- cf. [GitHub Pages Deployment - Nuxt.js](https://nuxtjs.org/faq/github-pages)

[Nuxt.js]: https://github.com/nuxt/nuxt.js
[create-nuxt-app]: https://github.com/nuxt/create-nuxt-app

```yaml
name: github pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v1
        with:
          node-version: '12.x'

      - name: Cache dependencies
        uses: actions/cache@v1
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - run: npm ci
      - run: npm test
      - run: npm run generate

      - name: deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### ⭐️ Docusaurus

An example workflow for [Docusaurus](https://docusaurus.io/).

`npx @docusaurus/init@next init website classic` is useful to create a new Docusaurus project.

```yaml
# .github/workflows/deploy.yml

name: github pages

on:
  push:
    branches:
      - master
    paths:
      - '.github/workflows/deploy.yml'
      - 'website/**'

defaults:
  run:
    working-directory: website

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v1
        with:
          node-version: '12.x'

      - name: Get yarn cache
        id: yarn-cache
        run: echo "::set-output name=dir::$(yarn cache dir)"

      - name: Cache dependencies
        uses: actions/cache@v1
        with:
          path: ${{ steps.yarn-cache.outputs.dir }}
          key: ${{ runner.os }}-website-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-website-

      - run: yarn install
      - run: yarn build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website/build
```

### ⭐️ Static Site Generators with Python

[pelican], [MkDocs], [sphinx], etc.

[pelican]: https://github.com/getpelican/pelican
[MkDocs]: https://github.com/mkdocs/mkdocs
[sphinx]: https://github.com/sphinx-doc/sphinx

Premise: Dependencies are managed by `requirements.txt`

```yaml
name: github pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Python
        uses: actions/setup-python@v1
        with:
          python-version: '3.6'
          architecture: 'x64'

      - name: Cache dependencies
        uses: actions/cache@v1
        with:
          path: ~/.cache/pip
          key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
          restore-keys: |
            ${{ runner.os }}-pip-

      - name: Install dependencies
        run: |
          python3 -m pip install --upgrade pip
          python3 -m pip install -r ./requirements.txt

      - run: mkdocs build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./site
```

### ⭐️ mdBook (Rust)

An example GitHub Actions workflow to deploy [rust-lang/mdBook] site to GitHub Pages.

[rust-lang/mdBook]: https://github.com/rust-lang/mdBook

- [peaceiris/actions-mdbook: GitHub Actions for mdBook (rust-lang/mdBook)](https://github.com/peaceiris/actions-mdbook)

```yaml
name: github pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup mdBook
        uses: peaceiris/actions-mdbook@v1
        with:
          mdbook-version: '0.3.7'
          # mdbook-version: 'latest'

      - run: mdbook build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./book
```

### ⭐️ Flutter Web

An exapmle workflow for [Flutter web project].

[Flutter web project]: https://flutter.dev/docs/get-started/web

```yaml
name: github pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Flutter
        run: |
          git clone https://github.com/flutter/flutter.git --depth 1 -b beta _flutter
          echo "::add-path::${GITHUB_WORKSPACE}/_flutter/bin"

      - name: Install
        run: |
          flutter config --enable-web
          flutter pub get

      - name: Build
        run: flutter build web

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build/web
```

### ⭐️ Elm

An exapmle workflow for [Elm].

[Elm]: https://elm-lang.org

```yaml
name: github pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v1
        with:
          node-version: '12.x'

      - name: Setup Elm
        run: npm install elm --global

      - name: Make
        run: elm make --optimize src/Main.elm

      - name: Move files
        run: |
          mkdir ./public
          mv ./index.html ./public/
        # If you have non-minimal setup with some assets and separate html/js files,
        # provide --output=<output-file> option for `elm make` and remove this step

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

### ⭐️ github/personal-website

- [github/personal-website](https://github.com/github/personal-website) - Code that'll help you kickstart a personal website that showcases your work as a software developer.

```yaml
# .github/workflows/github-pages.yml

name: GitHub Pages

on:
  push:
    branches:
      - master
  schedule:
    - cron: '24 */24 * * *'  # Once a day

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
          allow_empty_commit: true
          enable_jekyll: true
          cname: github.peaceiris.com
```

### ⭐️ Swift Publish

An example workflow for [JohnSundell/Publish].

[JohnSundell/Publish]: https://github.com/JohnSundell/Publish

```yaml
name: GitHub Pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup JohnSundell/Publish
        run: |
          cd ${HOME}
          git clone --depth=1 https://github.com/JohnSundell/Publish.git
          cd ./Publish
          swift build -c release
          echo "::add-path::${HOME}/Publish/.build/release"

      - run: publish-cli generate

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./Output
```



## License

- [MIT License - peaceiris/actions-gh-pages]

[MIT License - peaceiris/actions-gh-pages]: https://github.com/peaceiris/actions-gh-pages/blob/master/LICENSE



## Maintainer

- [peaceiris homepage](https://peaceiris.com/)
- [GitHub Action Hero: Shohei Ueda - The GitHub Blog](https://github.blog/2020-03-22-github-action-hero-shohei-ueda/)



<div align="right">
<a href="#table-of-contents">Back to TOC ☝️</a>
</div>
