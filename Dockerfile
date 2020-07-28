ARG NODE_VERSION
FROM node:${NODE_VERSION}-buster-slim

SHELL ["/bin/bash", "-l", "-c"]

RUN apt-get update && \
    apt-get install -y --no-install-recommends software-properties-common && \
    add-apt-repository ppa:git-core/ppa && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
    gnupg \
    git==2.28.0 \
    ca-certificates \
    wget \
    ssh \
    vim && \
    apt-get autoclean && \
    apt-get clean && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    npm i -g npm

ENV LANG="C.UTF-8"
ENV ImageVersion="20200625.0"
ENV GITHUB_API_URL="https://api.github.com"
ENV RUNNER_TOOL_CACHE="/opt/hostedtoolcache"
ENV GITHUB_REPOSITORY_OWNER="peaceiris"
ENV GITHUB_ACTIONS="true"
ENV CI="true"

WORKDIR /repo
RUN git --version && \
    git config --global init.defaultBranch main && \
    git config --global init.defaultBranch

CMD [ "bash" ]
