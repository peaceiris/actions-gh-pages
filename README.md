[![license](https://img.shields.io/github/license/peaceiris/actions-gh-pages.svg)](https://github.com/peaceiris/actions-gh-pages/blob/master/LICENSE)
[![release](https://img.shields.io/github/release/peaceiris/actions-gh-pages.svg)](https://github.com/peaceiris/actions-gh-pages/releases/latest)
[![GitHub release date](https://img.shields.io/github/release-date/peaceiris/actions-gh-pages.svg)](https://github.com/peaceiris/actions-gh-pages/releases)

<img width="400" alt="GitHub Actions for deploying to GitHub Pages with Static Site Generators" src="./images/ogp.svg">



## GitHub Actions for deploying to GitHub Pages

A GitHub Action to deploy your static site to GitHub Pages with [Static Site Generators] (Hugo, MkDocs, Gatsby, GitBook, etc.)

[Static Site Generators]: https://www.staticgen.com/



## Getting started

### (1) Add deploy Key

1. Generate deploy key `ssh-keygen -t rsa -b 4096 -C "your@email.com" -f gh-pages -N ""`
    - You will get 2 files: `gh-pages.pub` (public key) and `gh-pages` (private key)
2. Go to "Settings > Deploy Keys" of repository.
3. Add your public key within "Allow write access" option.
4. Go to "Settings > Secrets" of repository.
5. Add your private key as `ACTIONS_DEPLOY_KEY`

### (2) Create `main.workflow`

An example with Hugo action.

- [peaceiris/actions-hugo: GitHub Actions for Hugo extended](https://github.com/peaceiris/actions-hugo)

```hcl
workflow "GitHub Pages" {
  on = "push"
  resolves = ["deploy"]
}

action "is-branch-master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "build" {
  needs = "is-branch-master"
  uses = "peaceiris/actions-hugo@v0.55.6"
  args = ["--gc", "--minify", "--cleanDestinationDir"]
}

action "deploy" {
  needs = "build"
  uses = "peaceiris/actions-gh-pages@v1.0.0"
  env = {
    PUBLISH_DIR = "./public"
    PUBLISH_BRANCH = "gh-pages"
  }
  secrets = ["ACTIONS_DEPLOY_KEY"]
}
```



## License

[MIT License - peaceiris/actions-gh-pages]

[MIT License - peaceiris/actions-gh-pages]: https://github.com/peaceiris/actions-gh-pages/blob/master/LICENSE



## Support the author

<a href="https://www.patreon.com/peaceiris"><img src="./images/patreon.jpg" alt="peaceiris - Patreon" width="150px"></a>
