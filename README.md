# marmelab-boilerplate

A starter kit for new apps, based on:

* ES6 everywhere (with some bits of ES7, e.g. spread operator on objects)
* React.js, React Router, and Redux (for the frontend)
* Angular.js and ng-admin (for the admin)
* Node.js, Koa.js and PostgreSQL (for the API server)
* Makefile, webpack and Mocha (for the build and test)

Features:

* Babel transpilation (es2015, react, stage-0) for both client and server code
* Node.js API built on top of Koa.js (successor of Express) for cleaner async code
* Automated CRUD resources based on a PostgreSQL database (using `pg` and `co-pg`)
* State-of the art robustness and security for the API (JWT, rate limiting, secure headers, based on `helmet`)
* Separated API for the admin, with different security settings (and login form)
* Built-in database migration handling (using `db-migrate`)
* Production-level logging (using `winston`)
* CORS support (including on IE8, thanks to `xDomain`)
* Fully automated start and stop (see `Makefile`)
* Auto-reload of Node.js code upon modification (using `pm2`)
* Frontend app built with React, `redux`, `redux-saga`, `react-router`, and `redux-form`
* Using `react-dev-tools` and hot reload for easier development
* SASS preprocessor (using `node-sass`)
* Including a non-trivial example with several routes, Ajax calls, and functional tests
* Fully automated build with `webpack`, including development (`webpack-dev-server`) and production target (minified)
* Admin app built with Angular and `ng-admin`
* Including a full-featured admin panel with references
* Unified test build, running unit and functional tests on all apps, powered by `mocha`, `selenium`, and `nightwatch`
* AWS deployment automated by Fabric
* Sensible `eslint` defaults, based on rbnb's rules

The boilerplate contains a sample app with three domains: users, products, and orders. Feel free to remove the corresponding files once you start implementing your own domain.

## Install

Requirements:

* Node.js V5
* PostgreSQL

```sh
# install npm dependencies and Selenium (for tests)
make install
```

## Develop

```sh
# start servers (node and webpack via pm2)
make run-dev
# both servers will run in the background
# the Node server uses nodemon and will restart on code change
# the frontend is served by webpack dev server with hot reload

# you can restart either the api or the frontend by hand
make restart-api
make restart-frontend
```

Browse the app:

* [http://localhost:8080/admin](http://localhost:8080/admin) for the admin app
* [http://localhost:8080/frontend](http://localhost:8080/frontend) for the frontend app
* [http://localhost:3000](http://localhost:3000) for the API

```sh
# stop servers (node and webpack)
make stop-dev
```

Note: for stability purposes, it's a good practice to not upgrade your project dependencies using major updates.
It's why you should locally run `npm set prefix='~'` and not add dependencies prefixed with a carret `^` without good reason.

## Test

```sh
# tests run in the "test" environment and don't empty the "development" database
make test

# alternatively, you can run any of the individual test suites:
make test-api-unit
make test-api-functional
make test-frontend-unit
make test-frontend-functional
make test-isomorphic-unit
```

API (and common lib) unit tests using:

* [Mocha](http://mochajs.org/)
* expect from [Chai](http://chaijs.com/guide/styles/)

API functional tests using:

* [Mocha](http://mochajs.org/)
* expect from [Chai](http://chaijs.com/guide/styles/)
* [request](https://github.com/request/request)

Frontend unit tests using:

* [Mocha](http://mochajs.org/)
* [expect](https://github.com/mjackson/expect)
* [Redux Thunk](https://github.com/gaearon/redux-thunk), [redux-mock-store](https://github.com/arnaudbenard/redux-mock-store) and [nock](https://github.com/pgte/nock)
to test redux action creators (as explain in [redux documentation](http://rackt.org/redux/docs/recipes/WritingTests.html))
* [enzyme](https://github.com/airbnb/enzyme) to test react components

Frontend fonctional tests using:

* [Nightwatch.js](http://nightwatchjs.org/)


## Deployment

See [deployment instructions](doc/DEPLOY.md).


## Managing servers with PM2

dev and tests servers are managed with PM2. So, It's possible to :

```sh
# display the 'front dev' server's logs
make log-frontend-dev
# display the 'api dev' server's logs
make log-api-dev

# display the list of all servers
make servers-list
# display the monitoring for all servers
make servers-monitoring
# stop all servers
make servers-stop-all
# stop all servers, delete them, and clear their logs.
make servers-clear-all
```
