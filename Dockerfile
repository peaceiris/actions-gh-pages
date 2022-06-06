FROM ubuntu:18.04

SHELL ["/bin/bash", "-l", "-c"]

RUN apt-get update && \
    apt-get install -y --no-install-recommends software-properties-common gnupg && \
    add-apt-repository ppa:git-core/ppa && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    curl \
    wget \
    ssh \
    vim && \
    apt-get autoclean && \
    apt-get clean && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

RUN git --version && \
    git config --global init.defaultBranch main && \
    git config --global init.defaultBranch

WORKDIR /node
ARG NODE_VERSION
RUN curl -o nodejs.deb "https://deb.nodesource.com/node_${NODE_VERSION%%.*}.x/pool/main/n/nodejs/nodejs_${NODE_VERSION}-1nodesource1_amd64.deb" && \
    apt-get update && \
    apt-get install -y --no-install-recommends ./nodejs.deb && \
    npm config set user 0 && \
    npm config set unsafe-perm true && \
    npm i -g npm && \
    curl -sL https://deb.nodesource.com/test | bash - && \
    npm cache clean --force && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /node

WORKDIR /repo

ENV DEBIAN_FRONTEND="noninteractive"
ENV LANG="C.UTF-8"
ENV CI="true"
ENV ImageVersion="20200717.1"
ENV GITHUB_SERVER_URL="https://github.com"
ENV GITHUB_API_URL="https://api.github.com"
ENV GITHUB_GRAPHQL_URL="https://api.github.com/graphql"
ENV GITHUB_REPOSITORY_OWNER="peaceiris"
ENV GITHUB_ACTIONS="true"
ENV GITHUB_ACTOR="peaceiris"
ENV GITHUB_REPOSITORY="actions/pages"
ENV RUNNER_OS="Linux"
ENV RUNNER_TOOL_CACHE="/opt/hostedtoolcache"
ENV RUNNER_USER="runner"
ENV RUNNER_TEMP="/home/runner/work/_temp"
ENV RUNNER_WORKSPACE="/home/runner/work/pages"

CMD [ "bash" ]
