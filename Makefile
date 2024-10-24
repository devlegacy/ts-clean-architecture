SHELL:=$(shell which bash)
MAKEFLAGS+=-s

current_work_directory:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))

include .env
export $(shell sed 's/=.*//' .env)
export current_work_directory

include ./.etc/bin/colors

print_message:=./.etc/bin/print_message
setup_vscode:=./.etc/bin/setup_vscode
DOCKER:=$(shell command -v docker)
DOCKER_COMPOSE:=$(shell command -v docker-compose)

.DEFAULT_GOAL:=help

.ONESHELL:

.PHONY: help
.SILENT: help
help: ## 📋 Display help message with descriptions of all available commands.
	echo "Recommended usage: make [target]"
	echo ""
	echo "Targets:"
	grep -E '^[a-zA-Z0-9\/_ -]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "} {gsub(/^[^:]*:/, ""); gsub(/^ +| +$$/, "", $$1); printf "'${COLOR_GREEN}'%-10s'${COLOR_RESET}' : %s\n", $$1, $$2}'

.PHONY: deps/update
.SILENT: deps/update
deps/update: ## ⬆️ Update all project dependencies to their latest versions.
	$(print_message) "updating dependencies"
	ncu -u && ncu --target minor -u && ncu --target patch -u
	NODE_ENV= corepack up
	NODE_ENV= pnpm install
	NODE_ENV= pnpm audit --fix
	NODE_ENV= pnpm dedupe
.PHONY: setup/git
.SILENT: setup/git
setup/git: ## ⚙️ Setup the Git repository.
	$(print_message) "setting up git repository" \
	git config --local user.name "$${GIT_NAME}"; \
	git config --local user.email "$${GIT_EMAIL}"; \
	git config --local user.signingkey "$${GIT_SIGNINGKEY}"; \
	git config --local gpg.program "$${GPG_PATH}"; \
	git config --local commit.gpgsign true; \
	git config --local tag.gpgsign true; \
	git config --local log.showSignature true; \
	git config --local --list

.PHONY: show/versions
.SILENT: show/versions
show/versions: ## 📊 Display dependency versions for the project.
	$(print_message) "showing versions"
	echo "$$(git --version)"
	echo "node version $$(node -v)"
	echo "npm version $$(npm -v)"
	echo "pnpm version $$(pnpm -v)"
	echo "corepack version $$(corepack -v)"
	echo "bun version $$(bun -v )"
