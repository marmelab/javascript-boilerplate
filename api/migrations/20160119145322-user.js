'use strict';

var dbm;
var type;
var seed;
var async = require('async');

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.up = function(db, callback) {
    async.series([
        db.createTable.bind(db, 'users', {
            id: { type: 'int', primaryKey: true, autoIncrement: true },
            email: { type: 'string'},
            password: { type: 'string'},
        }),
    ], callback);
};

exports.down = function(db, callback) {
    async.series([
        db.dropTable.bind(db, 'user'),
    ], callback);
};
