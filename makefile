.PHONY: build test

ADMIN_NAME ?= sheldon
ADMIN_EMAIL ?= sheldon@newapp.com
ADMIN_PASSWORD ?= password

CLIENT_NAME ?= leonard
CLIENT_EMAIL ?= leonard@newapp.com
CLIENT_PASSWORD ?= supadupa42!

build:
	@./node_modules/.bin/webpack --progress

clean:
	git clean -nxdf

copy-conf:
	@cp -n ./config/development-dist.js ./config/development.js | true

migrate:
	@./node_modules/.bin/db-migrate \
		--migrations-dir=api/migrations \
		--config=config/database.js \
		up

install: copy-conf
	@echo "Installing Node dependencies"
	@npm install
	@echo "Installing Selenium server"
	@./node_modules/.bin/selenium-standalone install --version=2.48.2

install-prod: install
	@echo "Copy production conf"
	@cp -n ./config/production-dist.js ./config/production.js | true

run-dev:
	@node_modules/.bin/pm2 start ./pm2_servers/dev.json
stop-dev:
	@node_modules/.bin/pm2 stop ./pm2_servers/dev.json
restart-frontend-dev:
	@node_modules/.bin/pm2 restart tp_frontend-dev
	@echo "Webpack dev restarted"
restart-api-dev:
	@node_modules/.bin/pm2 restart tp_api-dev
	@echo "API dev restarted"
log-frontend-dev:
	@node_modules/.bin/pm2 logs tp_frontend-dev
log-api-dev:
	@node_modules/.bin/pm2 logs tp_api-dev

# test/production targets

run-api:
	@node ./api/index.js

run-frontend:
	@./node_modules/.bin/webpack-dev-server  \
		--no-info \
		--colors \
		--devtool cheap-module-inline-source-map \
		--hot  \
		--inline

test-api-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha --require "./babel-transformer" --require=co-mocha --recursive api/

test-api-functional:
	@NODE_ENV=test NODE_PORT=3010 ./node_modules/.bin/mocha --require "./babel-transformer" --require=co-mocha --recursive api/test/functional

test-frontend-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha --compilers="css:./app/test/null-compiler,js:babel-core/register" --recursive ./app/frontend/js/**/*.spec.js

test-isomorphic-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha --compilers="js:babel-core/register" --recursive isomorphic/{,**/}*.spec.js

test-frontend-functional:
	# TODO: restore when implemented
	# @NODE_ENV=test ./node_modules/.bin/babel-node ./bin/loadFixtures.js
	# @make build-test
	@node_modules/.bin/pm2 start ./pm2_servers/test.json
	@node_modules/.bin/nightwatch
	@node_modules/.bin/pm2 stop ./pm2_servers/test.json

test:
	@cp -n ./config/test-dist.js ./config/test.js | true
	make test-frontend-unit
	make test-api-unit
	# TODO: restore when implemented
	# make test-isomorphic-unit
	make test-api-functional
	make test-frontend-functional

servers-monitoring:
	@node_modules/.bin/pm2 monit
servers-list:
	@node_modules/.bin/pm2 list
servers-stop-all:
	@node_modules/.bin/pm2 stop all
servers-clear-all:
	@node_modules/.bin/pm2 stop all
	@node_modules/.bin/pm2 delete all
	@node_modules/.bin/pm2 flush

create-admin:
	./node_modules/babel-cli/bin/babel-node.js ./bin/createAdmin.js ${ADMIN_NAME} ${ADMIN_EMAIL} ${ADMIN_PASSWORD}

create-client:
	./node_modules/babel-cli/bin/babel-node.js ./bin/createAdmin.js ${CLIENT_NAME} ${CLIENT_EMAIL} ${CLIENT_PASSWORD}
