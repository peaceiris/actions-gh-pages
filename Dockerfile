ARG NODE_VERSION

FROM node:${NODE_VERSION}-buster-slim

SHELL ["/bin/bash", "-l", "-c"]

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    libcurl4-gnutls-dev libexpat1-dev gettext libz-dev libssl-dev autoconf \
    ca-certificates \
    wget \
    ssh \
    vim && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /git
ENV GIT_VERSION="2.25.0"
RUN wget -q "https://github.com/git/git/archive/v${GIT_VERSION}.tar.gz" && \
    tar -zxf "./v${GIT_VERSION}.tar.gz" && \
    rm "./v${GIT_VERSION}.tar.gz" && \
    cd "./git-${GIT_VERSION}" && \
    make configure && \
    ./configure --prefix=/usr && \
    make all && \
    make install

WORKDIR /repo

CMD [ "bash" ]
