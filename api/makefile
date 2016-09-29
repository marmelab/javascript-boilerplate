.PHONY: build test help
.DEFAULT_GOAL := help

PM2_HOME ?= .pm2

help:
	@grep -P '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Initialization ===============================================================
copy-conf: ## Initialize the configuration files by copying the *-dist versions (does not override existing config)
	@cp -n ./config/development-dist.js ./config/development.js | true
	@cp -n ./config/staging-dist.js ./config/staging.js | true
	@cp -n ./config/production-dist.js ./config/production.js | true
	@cp -n ./config/test-dist.js ./config/test.js | true

install-npm-dependencies:
	@echo "Installing Node dependencies"
	@npm install

install: copy-conf install-npm-dependencies ## Install npm dependencies for the api, admin, and frontend apps

# Development ==================================================================
run-dev: ## Run the development environment
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 start ./config/pm2_servers/dev.json
	@echo "API:          http://localhost:3000"
	@echo "Type 'make stop-dev' to stop the apps"

restart-dev: ## Restart the development environment
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 restart bpm_api-dev
	@echo "All apps restarted"

stop-dev: ## Stop the development environment
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 delete ./config/pm2_servers/dev.json
	@echo "All apps stopped"

servers-monitoring: ## Get an overview of your processes with PM2
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 monit

servers-list: ## List the processes managed by PM2
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 list

servers-stop-all: ## Stop all processes with PM2
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 stop all

servers-clear-all: ## Delete all processes and flush the logs in PM2
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 stop all
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 delete all
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 flush

log-dev: ## Display the logs of the API with PM2
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 logs bpm_api-dev

# Tests ========================================================================
test-unit: ## Run the unit tests
	@NODE_ENV=test NODE_PORT=3010 ./node_modules/.bin/mocha --require=reify --require=async-to-gen/register --require=co-mocha --recursive ./src/

test-functional: reset-test-database ## Run the functional tests
	@NODE_ENV=test NODE_PORT=3010 ./node_modules/.bin/mocha --require=reify --require=async-to-gen/register --require=co-mocha --recursive ./e2e

load-test-fixtures: ## Initialize the test database with fixtures
	@NODE_ENV=test ./node_modules/.bin/babel-node ./bin/loadFixtures.js

test: ## Run all tests
	make test-unit
	make test-functional

reset-test-database: ## Reset the test database and run all migrations
	@NODE_ENV=test ./node_modules/.bin/db-migrate \
		--migrations-dir=../var/migrations \
		--config=config/database.js \
		-e api \
		reset
	@NODE_ENV=test ./node_modules/.bin/db-migrate \
		--migrations-dir=../var/migrations \
		--config=config/database.js \
		-e api \
		up
