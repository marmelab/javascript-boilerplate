.PHONY: build test help
.DEFAULT_GOAL := help

PM2_HOME ?= ../.pm2

help:
	@grep -P '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Initialization ===============================================================
copy-conf: ## Initialize the configuration files by copying the *''-dist" versions (does not override existing config)
	@cp -n ./config/development-dist.js ./config/development.js | true
	@cp -n ./config/staging-dist.js ./config/staging.js | true
	@cp -n ./config/production-dist.js ./config/production.js | true
	@cp -n ./config/test-dist.js ./config/test.js | true

install-npm-dependencies:
	@echo "Installing Node dependencies"
	@npm install

install-selenium:
	@echo "Installing Selenium server"
	@./node_modules/.bin/selenium-standalone install --version=2.50.1 --drivers.chrome.version=2.21

install: copy-conf install-npm-dependencies install-selenium ## Install npm dependencies

# Build ========================================================================
clear-build:  ## Remove precedent build files
	@rm -rf ./build/admin

build: clear-build ## Build the application
	@./node_modules/.bin/webpack --progress

# Development ==================================================================
run-dev: ## Run the development environment
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 start ./config/pm2_servers/dev.json
	@echo "Admin app:    http://localhost:8081"
	@echo "Type 'make stop-dev' to stop the apps"

restart-dev: ## Restart the development environment
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 restart bpm_admin-dev
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

log-dev: ## Display the logs with PM2
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 logs bpm_admin-dev

# Tests ========================================================================
build-test: ## Build the application for test environment
	@NODE_ENV=test make build

test-unit: ## Run the unit tests
	@NODE_ENV=test NODE_PATH=$NODE_PATH:.. ./node_modules/.bin/mocha --require=co-mocha --require=./registerBabelForTests.js --compilers="css:../isomorphic/webpack/null-compiler" "./src/js/**/*.spec.js"

test-functional: ## Run the functional tests
	@make build-test
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 start ./config/pm2_servers/test.json
	@NODE_ENV=test SELENIUM_BROWSER=chrome SELENIUM_BROWSER_BINARY_PATH="./node_modules/selenium-standalone/.selenium/chromedriver/2.21-x64-chromedriver" \
		./node_modules/.bin/mocha \
		--compilers="js:babel-core/register" \
		--recursive \
		./e2e
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 delete ./config/pm2_servers/test.json

test: ## Run all tests
	@cp -n ./config/test-dist.js ./config/test.js | true
	make test-unit
	# make test-functional
