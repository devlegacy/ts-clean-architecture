current_work_directory := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
include .env
export $(shell sed 's/=.*//' .env)

include ./.bin/colors.sh
include ./.bin/timestamp.mk
include ./.bin/print_message.mk
include ./.bin/vscode.mk

.DEFAULT_GOAL := help

SHELL := $(shell which bash)

DOCKER := $(shell command -v docker)
DOCKER_COMPOSE := $(shell command -v docker-compose)

.PHONY: help
help: ## 📋 Display this help message with descriptions of all available commands.
	@echo "Recommended usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z0-9\/_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "} {gsub(/^[^:]*:/, ""); gsub(/^ +| +$$/, "", $$1); printf "'${COLOR_GREEN}'%-10s'${COLOR_RESET}' : %s\n", $$1, $$2}'

.PHONY: update
update: ## ⬆️ Update all project dependencies to their latest versions.
	@$(call print_message, "updating dependencies")
	@ncu -u
	@corepack up
	@NODE_ENV= pnpm install
	@NODE_ENV= pnpm audit --fix

.PHONY: setup/git
setup/git: ## ⚙️ Setup the Git repository.
	@$(call print_message, "setting up git repository")
	@echo "$(current_work_directory)"; \
	git config --local user.name "$${GIT_NAME}"; \
	git config --local user.email "$${GIT_EMAIL}"; \
	git config --local user.signingkey "$${GIT_SIGNINGKEY}"; \
	git config --local gpg.program "$${GPG_PATH}"; \
	git config --local commit.gpgsign true; \
	git config --local tag.gpgsign true; \
	git config --local log.showSignature true; \
	git config --local --list
