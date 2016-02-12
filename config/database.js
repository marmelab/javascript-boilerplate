'use strict';

var config = require('config');

module.exports = {
    api: config.apps.api.db // "dev" is for default db-migrate environment, do not touch
};
