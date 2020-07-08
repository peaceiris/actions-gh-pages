cmd := "bash"
msg := ""
IMAGE_NAME := docker.pkg.github.com/peaceiris/actions-gh-pages/dev:latest
NODE_VERSION := $(shell cat ./.nvmrc)
DOCKER_RUN := docker run --rm -i -t -v ${PWD}:/repo -v ~/.gitconfig:/root/.gitconfig $(IMAGE_NAME)
DOCKER_RUN_CI := docker run --rm -v ${PWD}:/repo $(IMAGE_NAME)


.PHONY: build
build:
	docker build . \
		--build-arg NODE_VERSION=$(NODE_VERSION) \
		--cache-from=${IMAGE_NAME} \
		-t $(IMAGE_NAME)

.PHONY: pull
pull:
	docker pull ${IMAGE_NAME}

.PHONY: push
push:
	docker push ${IMAGE_NAME}

.PHONY: run
run:
	$(DOCKER_RUN) $(cmd)

.PHONY: cirun
cirun:
	$(DOCKER_RUN_CI) $(cmd)

.PHONY: test
test:
	$(DOCKER_RUN) npm test

.PHONY: commit
commit:
	$(DOCKER_RUN) git commit -m "$(msg)"

.PHONY: all
all:
	$(DOCKER_RUN) npm run all

.PHONY: ciall
ciall:
	$(DOCKER_RUN_CI) npm run all
