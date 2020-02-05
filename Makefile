cmd := "bash"
msg := ""
IMAGE_NAME := actions_github_pages_dev:latest
NODE_VERSION := $(shell cat ./.nvmrc)
DOCKER_BUILD := docker build . -t $(IMAGE_NAME) --build-arg NODE_VERSION=$(NODE_VERSION)
DOCKER_RUN := docker run --rm -i -t -v ${PWD}:/repo -v ~/.gitconfig:/root/.gitconfig $(IMAGE_NAME)


.PHONY: build
build:
	$(DOCKER_BUILD)

.PHONY: run
run:
	$(DOCKER_RUN) $(cmd)

.PHONY: test
test:
	$(DOCKER_RUN) npm test

.PHONY: commit
commit:
	$(DOCKER_RUN) git commit -m "$(msg)"
