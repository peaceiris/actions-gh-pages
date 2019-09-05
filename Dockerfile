FROM alpine:3.10.2

RUN apk add --no-cache \
    bash \
    git \
    openssh-client \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
