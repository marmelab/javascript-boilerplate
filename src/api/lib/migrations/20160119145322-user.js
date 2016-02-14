'use strict';

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.up = function(db, callback) {
    db.createTable('user_account', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        email: { type: 'string'},
        password: { type: 'string'},
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('user_account', callback);
};
