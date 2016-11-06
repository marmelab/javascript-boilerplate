.PHONY: build test help
.DEFAULT_GOAL := help

NODE_ENV ?= development

ADMIN_NAME ?= sheldon
ADMIN_EMAIL ?= sheldon@newapp.com
ADMIN_PASSWORD ?= password

CLIENT_NAME ?= leonard
CLIENT_EMAIL ?= leonard@newapp.com
CLIENT_PASSWORD ?= password

PM2_HOME ?= .pm2

help:
	grep -P '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Initialization ===============================================================
copy-conf: ## Initialize the configuration files by copying the *''-dist" versions (does not override existing config)
	-cp -n ./config/${NODE_ENV}-dist.js ./config/${NODE_ENV}.js
ifeq ($(NODE_ENV), development)
	-cp -n ./config/test-dist.js ./config/test.js
endif

install-npm-dependencies:
	@echo "Installing Node dependencies for environment $(NODE_ENV)"
	npm install $(if $(filter production staging,$(NODE_ENV)),--production,)
ifeq ($(NODE_ENV), development)
	make install-selenium
endif

install-selenium:
	echo "Installing Selenium server"
	./node_modules/.bin/selenium-standalone install --version=2.50.1 --drivers.chrome.version=2.24

install: copy-conf install-npm-dependencies install-selenium ## Install npm dependencies for the api, admin, and frontend apps

# Deployment ===================================================================
clear-build-admin:  ## Remove precedent build files for admin
	rm -rf ./build/admin/*

clear-build-frontend:  ## Remove precedent build files for frontend
	rm -rf ./build/frontend/*

build-admin: clear-build-admin ## Build admin application
	echo "Building frontend application"
	BABEL_ENV=browser-$(NODE_ENV) ./node_modules/.bin/webpack \
		--config ./src/admin/webpack.config.babel.js \
		$(if $(filter production staging,$(NODE_ENV)),-p,-d) \
		--progress

build-frontend: clear-build-frontend ## Build frontend application
	echo "Building frontend application"
	BABEL_ENV=browser-$(NODE_ENV) ./node_modules/.bin/webpack \
		--config ./src/frontend/webpack.config.babel.js \
		$(if $(filter production staging,$(NODE_ENV)),-p,-d) \
		--progress

build: build-frontend build-admin ## Build all front applications defined with webpack

clean: ## Remove only files ignored by Git
	git clean --force -d -X

install-aws: ## Install the aws cli
	curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
	unzip awscli-bundle.zip
	sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
	rm -rf ./awscli-bundle/ awscli-bundle.zip
	aws configure

setup-server: ## Setup the server before deployment (specify NODE_ENV for correct fabricrc file loading)
	fab --config=.fabricrc-$(NODE_ENV) setup_api check

deploy-api: ## Deploy the API (specify NODE_ENV for correct fabricrc file loading)
	fab --config=.fabricrc-$(NODE_ENV) deploy_api

deploy-frontends: ## Deploy the frontend (specify NODE_ENV for correct fabricrc file loading)
	fab --config=.fabricrc-$(NODE_ENV) deploy_static

deploy: deploy-api deploy-frontends ## Deploy the apps (specify NODE_ENV for correct fabricrc file loading)

# Development ==================================================================
run-dev: ## Run all applications in development environment (using webpack-dev-server)
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 start ./config/pm2_servers/dev.json
	echo "All apps started and running"
	echo "  API:          http://localhost:3000"
	echo "  Frontend App: http://localhost:8080"
	echo "  Admin app:    http://localhost:8081"
	echo "Type 'make stop-dev' to stop the apps"

restart-dev: ## Restart all applications in development environment
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 restart bpm_admin-dev
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 restart bpm_api-dev
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 restart bpm_frontend-dev
	echo "All apps restarted"

stop-dev: ## Stop all applications in development environment
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 delete ./config/pm2_servers/dev.json
	echo "All apps stopped"

restart-admin-dev: ## Restart the admin in development environment
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 restart bpm_admin-dev
	echo "Webpack dev restarted"

restart-api-dev: ## Restart the API in development environment
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 restart bpm_api-dev
	echo "API dev restarted"

restart-frontend-dev: ## Restart the frontend in development environment
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 restart bpm_frontend-dev
	echo "Webpack dev restarted"

run-api: ## Starts the API (you may define the NODE_ENV)
	node \
		--harmony-async-await \
		--require reify \
		./src/api/index.js

servers-monitoring: ## Get an overview of your processes with PM2
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 monit

servers-list: ## List the processes managed by PM2
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 list

servers-stop-all: ## Stop all processes with PM2
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 stop all

servers-clear-all: ## Delete all processes and flush the logs in PM2
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 stop all
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 delete all
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 flush

log-admin-dev: ## Display the logs of the frontend applications with PM2
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 logs bpm_admin-dev

log-api-dev: ## Display the logs of the API with PM2
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 logs bpm_api-dev

log-frontend-dev: ## Display the logs of the frontend applications with PM2
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 logs bpm_frontend-dev

log-admin-test: ## Display the logs of the admin with PM2 in test environment
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 logs bpm_frontend-test

log-api-test: ## Display the logs of the API with PM2 in test environment
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 logs bpm_api-test

log-frontend-test: ## Display the logs of the frontend with PM2 in test environment
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 logs bpm_frontend-test

# Tests ========================================================================
test-admin-unit: ## Run the admin application unit tests with mocha
	NODE_ENV=test BABEL_ENV=browser-test ./node_modules/.bin/mocha \
		--require='./src/admin/js/test.spec.js' \
		--compilers="css:./src/common/e2e/lib/webpack-null-compiler,js:babel-core/register" \
		"./src/admin/js/**/*.spec.js"

test-api-unit: ## Run the API unit tests with mocha
	NODE_ENV=test BABEL_ENV=node NODE_PORT=3010 ./node_modules/.bin/mocha \
		--require=babel-register \
		--harmony-async-await \
		"./src/api/{,!(e2e)/**/}*.spec*.js"

test-api-functional: reset-test-database ## Run the API functional tests with mocha
	NODE_ENV=test BABEL_ENV=node NODE_PORT=3010 ./node_modules/.bin/mocha \
		--require=babel-register \
		--harmony-async-await \
		--recursive \
		./src/api/e2e

test-frontend-unit: ## Run the frontend application unit tests with mocha
	NODE_ENV=test BABEL_ENV=browser-test ./node_modules/.bin/mocha \
		--require=babel-register \
		--require='./src/frontend/js/test.spec.js' \
		--compilers="css:./src/common/e2e/lib/webpack-null-compiler,js:babel-core/register" \
		"./src/frontend/js/**/*.spec.js"

test-common-unit: ## Run the common directory unit tests with mocha
	NODE_ENV=test BABEL_ENV=browser-test ./node_modules/.bin/mocha \
		--compilers="css:./src/common/e2e/lib/webpack-null-compiler,js:babel-core/register" \
		"./src/common/{,**/}*.spec.js"

test-frontend-functional: reset-test-database load-test-fixtures ## Run the frontend applications functional tests with nightwatch
	NODE_ENV=test make build-frontend
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 start ./config/pm2_servers/test.json
	NODE_ENV=test SELENIUM_BROWSER_BINARY_PATH="./node_modules/selenium-standalone/.selenium/chromedriver/2.24-x64-chromedriver" \
		./node_modules/.bin/mocha \
        --harmony-async-await \
		--compilers="js:babel-core/register" \
		--recursive \
		./src/frontend/e2e
	PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 delete ./config/pm2_servers/test.json

load-test-fixtures: ## Initialize the test database with fixtures
	NODE_ENV=test node --require babel-register --harmony-async-await ./bin/loadFixtures.js

test: ## Run all tests
	-cp -n ./config/test-dist.js ./config/test.js
	make test-common-unit
	make test-frontend-unit
	make test-admin-unit
	make test-api-unit
	make test-api-functional
	make test-frontend-functional

reset-test-database: ## Reset the test database and run all migrations
	NODE_ENV=test ./node_modules/.bin/db-migrate \
		--migrations-dir=./src/migrations \
		--config=config/database.js \
		-e api \
		reset
	NODE_ENV=test ./node_modules/.bin/db-migrate \
		--migrations-dir=./src/migrations \
		--config=config/database.js \
		-e api \
		up

# Migrations ===================================================================
migrate: ## Migrate the database defined in the configuration (you may define the NODE_ENV)
	./node_modules/.bin/db-migrate \
		--migrations-dir=./src/migrations \
		--config=config/database.js \
		-e api \
		up

create-migration: ## Create a new migration (you may define the NODE_ENV to select a specific configuration)
	./node_modules/.bin/db-migrate \
		--migrations-dir=./src/migrations \
		--config=config/database.js \
		-e api \
		create migration

load-fixtures: ## Load fixtures in the database (you may define the NODE_ENV to select a specific configuration)
	./node_modules/.bin/babel-node ./bin/loadFixtures.js

# Binaries =====================================================================
create-admin: ## Create a new admin user in the database (you may define the NODE_ENV to select a specific configuration)
	./node_modules/babel-cli/bin/babel-node.js ./bin/createAdmin.js ${ADMIN_NAME} ${ADMIN_EMAIL} ${ADMIN_PASSWORD}

create-client: ## Create a new user in the database (you may define the NODE_ENV to select a specific configuration)
	# TODO: ensure we create a simple user and not an admin
	./node_modules/babel-cli/bin/babel-node.js ./bin/createAdmin.js ${CLIENT_NAME} ${CLIENT_EMAIL} ${CLIENT_PASSWORD}
