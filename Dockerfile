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

WORKDIR /node
ARG NODE_VERSION
RUN curl -o nodejs.deb "https://deb.nodesource.com/node_${NODE_VERSION%%.*}.x/pool/main/n/nodejs/nodejs_${NODE_VERSION}-1nodesource1_amd64.deb" && \
    apt-get update && \
    apt-get install -y --no-install-recommends ./nodejs.deb && \
    npm i -g npm && \
    curl -sL https://deb.nodesource.com/test | bash - && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /node

WORKDIR /repo

ENV LANG="C.UTF-8"
ENV ImageVersion="20200625.0"
ENV GITHUB_API_URL="https://api.github.com"
ENV RUNNER_TOOL_CACHE="/opt/hostedtoolcache"
ENV GITHUB_REPOSITORY_OWNER="peaceiris"
ENV GITHUB_ACTIONS="true"
ENV CI="true"

RUN echo "node version: $(node -v)" && \
    echo "npm version: $(npm -v)" && \
    git --version && \
    git config --global init.defaultBranch main && \
    git config --global init.defaultBranch

CMD [ "bash" ]
