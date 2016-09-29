.PHONY: build test help
.DEFAULT_GOAL := help

ADMIN_NAME ?= sheldon
ADMIN_EMAIL ?= sheldon@newapp.com
ADMIN_PASSWORD ?= password

CLIENT_NAME ?= leonard
CLIENT_EMAIL ?= leonard@newapp.com
CLIENT_PASSWORD ?= password

PM2_HOME ?= .pm2

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

install: copy-conf install-npm-dependencies ## Install npm dependencies for the api, admin, and frontend apps
	@$(MAKE) --directory ./api install
	@$(MAKE) --directory ./admin install
	@$(MAKE) --directory ./frontend install

# Deployment ===================================================================
clear-build:  ## Remove precedent build files
	@rm -rf ./build/*

build: clear-build ## Build all front applications defined with webpack
	@./node_modules/.bin/webpack --progress

clean: ## Remove only files ignored by Git
	git clean --force -d -X

install-aws: ## Install the aws cli
	curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
	unzip awscli-bundle.zip
	sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
	rm -rf ./awscli-bundle/ awscli-bundle.zip
	aws configure

install-prod: ## Install npm dependencies for the api, admin, and frontend apps in production environment
	@echo "Installing Node dependencies"
	@npm install --production
	@echo "Copy production conf"
	@cp -n ./config/production-dist.js ./config/production.js | true

setup-staging: ## Setup the staging environment
	fab --config=.fabricrc-staging setup_api check

setup-prod: ## Setup the production environment
	fab --config=.fabricrc setup_api check

deploy-staging-api: ## Deploy the API in staging environment
	fab --config=.fabricrc-staging deploy_api

deploy-staging-frontend: ## Deploy the frontend in staging environment
	fab --config=.fabricrc-staging deploy_static

deploy-staging: deploy-staging-api deploy-staging-frontend ## Deploy the staging environment

deploy-prod-api: ## Deploy the API in production environment
	fab --config=.fabricrc deploy_api

deploy-prod-frontend: ## Deploy the frontend in production environment
	fab --config=.fabricrc deploy_static

deploy-prod: deploy-prod-api deploy-prod-frontend ## Deploy the production environment

# Development ==================================================================
run-dev: ## Run all applications in development environment (using webpack-dev-server)
	@$(MAKE) --directory ./api run-dev
	@$(MAKE) --directory ./admin run-dev
	@$(MAKE) --directory ./frontend run-dev
	@echo "All apps started and running"
	@echo "  API:          http://localhost:3000"
	@echo "  Frontend App: http://localhost:8080/frontend"
	@echo "  Admin app:    http://localhost:8080/admin"
	@echo "Type 'make stop-dev' to stop the apps"

restart-dev: ## Restart all applications in development environment
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 restart bpm_api-dev
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 restart bpm_admin-dev
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 restart bpm_frontend-dev
	@echo "All apps restarted"

stop-dev: ## Stop all applications in development environment
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 delete bpm_api-dev
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 delete bpm_admin-dev
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 delete bpm_frontend-dev
	@echo "All apps stopped"

restart-frontend-dev: ## Restart all frontend applications in development environment
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 restart bpm_frontend-dev
	@echo "Webpack dev restarted"

restart-api-dev: ## Restart the API in development environment
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 restart bpm_api-dev
	@echo "API dev restarted"

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

log-api-dev: ## Display the logs of the API with PM2
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 logs bpm_api-dev

log-admin-dev: ## Display the logs of the admin application with PM2
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 logs bpm_admin-dev

log-frontend-dev: ## Display the logs of the frontend application with PM2
	@PM2_HOME=$(PM2_HOME) node_modules/.bin/pm2 logs bpm_frontend-dev

# Tests ========================================================================
test: ## Run all tests
	@$(MAKE) --directory ./api test
	@$(MAKE) --directory ./admin test
	@$(MAKE) --directory ./frontend test

# Migrations ===================================================================
migrate: ## Migrate the database defined in the configuration (you may define the NODE_ENV)
	@./node_modules/.bin/db-migrate \
		--migrations-dir=./var/migrations \
		--config=config/database.js \
		-e api \
		up

create-migration: ## Create a new migration (you may define the NODE_ENV to select a specific configuration)
	@./node_modules/.bin/db-migrate \
	--migrations-dir=./var/migrations \
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
