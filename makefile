.PHONY: build test

build:
	@./node_modules/.bin/webpack --progress

clean:
	git clean -nxdf

copy-conf:
	@cp -n ./config/development-dist.js ./config/development.js | true

install: copy-conf
	@echo "Installing Node dependencies"
	@npm install
	@echo "Installing Selenium server"
	@./node_modules/.bin/selenium-standalone install

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
		--quiet \
		--colors \
		--devtool cheap-module-inline-source-map \
		--hot  \
		--inline

# TODO: restore when implemented
# test-api-unit:
# 	@NODE_ENV=test ./node_modules/.bin/mocha --require "./babel-transformer" --require=co-mocha --recursive api/test/unit

test-api-functional:
	@NODE_ENV=test NODE_PORT=3010 ./node_modules/.bin/mocha --require "./babel-transformer" --require=co-mocha --recursive api/test/functional

test-frontend-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha --compilers="css:./app/test/null-compiler,js:babel-core/register" --recursive app/{,**/}*.spec.js

test-isomorphic-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha --compilers="js:babel-core/register" --recursive isomorphic/{,**/}*.spec.js

start-node-server: node-server.PID
node-server.PID:
	@NODE_ENV=test NODE_PORT=3010 node api/index.js & echo "$$!" > node-server.PID
stop-node-server: node-server.PID
	@kill `cat $<` && rm $<
	@echo "Node server stopped"

start-static-server: static-server.PID
static-server.PID:
	@echo "Starting static server"
	@cd ./build && { ../node_modules/.bin/http-server -p 8081 & echo $$! > ../$@; } && cd ..
stop-static-server: static-server.PID
	@kill `cat $<` && rm $<

start-selenium: selenium.PID
selenium.PID:
	@echo "Starting selenium server"
	xvfb-run --server-args="-screen 0, 1366x768x24" ./node_modules/.bin/selenium-standalone start > /dev/null 2>&1 & echo "$$!" > selenium.PID
stop-selenium: selenium.PID
	@kill `cat $<` && rm $<
	@echo "Selenium server stopped"

webdriver:
	@NODE_ENV=test NODE_PORT=3010 ./node_modules/.bin/mocha --require "./babel-transformer" --require=co-mocha --recursive app/{,**/}/functional/{,**/}*.js

build-test:
	@NODE_ENV=test NODE_PORT=3010 ./node_modules/.bin/webpack

test-frontend-functional:
	# TODO: restore when implemented
	# @NODE_ENV=test ./node_modules/.bin/babel-node ./bin/loadFixtures.js
	#@make build-test
	@make start-selenium
	@make start-node-server
	@make start-static-server
	@sleep 2
	@make webdriver
	@make stop-node-server
	@make stop-static-server
	@make stop-selenium

test:
	@cp -n ./config/test-dist.js ./config/test.js | true
	# TODO: restore when implemented
	# make test-api-unit
	make test-frontend-unit
	# TODO: restore when implemented
	# make test-isomorphic-unit
	make test-api-functional
	#make test-frontend-functional
