# marmelab-boilerplate

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

## Test

```sh
# tests run in the "test" environment and don't empty the "development" database
make test

# alternately, you can run any of the individual test suites:
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
