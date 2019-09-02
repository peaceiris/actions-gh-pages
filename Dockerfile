FROM ubuntu:18.04

LABEL "com.github.actions.name"="Deploy to GitHub Pages for Static Site Generator"
LABEL "com.github.actions.description"="A GitHub Action to deploy your static site to GitHub Pages with Static Site Generator"
LABEL "com.github.actions.icon"="upload-cloud"
LABEL "com.github.actions.color"="blue"

LABEL "repository"="https://github.com/peaceiris/actions-gh-pages"
LABEL "homepage"="https://github.com/peaceiris/actions-gh-pages"
LABEL "maintainer"="peaceiris"

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    openssh-client \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
