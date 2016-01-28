.PHONY: build test

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

run-frontend-dev: webpack.PID

webpack.PID:
	@./node_modules/.bin/webpack-dev-server \
		--content-base=build \
		--devtool=cheap-module-inline-source-map \
		--hot \
		--inline \
		--quiet \
		--progress \
		& echo "$$!" > webpack.PID

stop-frontend-dev: webpack.PID
	@kill `cat $<` && rm $<
	@echo "Webpack server stopped"

run-api-dev: server.PID
server.PID:
	@./node_modules/.bin/nodemon --watch api --watch config api/index.js & echo "$$!" > server.PID
stop-api-dev: server.PID
	@kill `cat $<` && rm $<
	@echo "Node server stopped"

run-dev: run-frontend-dev run-api-dev
stop-dev: stop-frontend-dev stop-api-dev

restart-api:
	@make stop-api-dev && make run-api-dev
	@echo "API restarted"
restart-frontend:
	@make stop-frontend-dev && make run-frontend-dev
	@echo "Frontend app restarted"

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
	@NODE_ENV=test ./node_modules/.bin/mocha --compilers="css:./app/test/null-compiler,js:babel-core/register" --recursive app/{,**/}*.spec.js

test-isomorphic-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha --compilers="js:babel-core/register" --recursive isomorphic/{,**/}*.spec.js

test-frontend-functional:
	# TODO: restore when implemented
	# @NODE_ENV=test ./node_modules/.bin/babel-node ./bin/loadFixtures.js
	# @make build-test
	@node_modules/.bin/pm2 start ./pm2/test_front_functional_servers.json
	@node_modules/.bin/nightwatch -e firefox,chrome
	@node_modules/.bin/pm2 stop node-server-test
	@node_modules/.bin/pm2 stop static-server-test

test:
	@cp -n ./config/test-dist.js ./config/test.js | true
	make test-frontend-unit
	make test-api-unit
	# TODO: restore when implemented
	# make test-isomorphic-unit
	make test-api-functional
	#make test-frontend-functional
