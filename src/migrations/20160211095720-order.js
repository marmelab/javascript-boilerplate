'use strict';

exports.up = function (db, callback) {
    db.createTable('user_order', {
        id: { type: 'uuid', primaryKey: true },
        reference: { type: 'string' },
        date: { type: 'date' },
        customer_id: { type: 'uuid' },
        total: { type: 'real' },
        status: { type: 'string' },
    }, callback);
};

exports.down = function (db, callback) {
    db.dropTable('user_order', callback);
};
