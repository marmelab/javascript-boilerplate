'use strict';

exports.up = function(db, callback) {
    db.createTable('orders', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        reference: { type: 'string' },
        date: { type: 'date' },
        customer_id: { type: 'int' },
        total: { type: 'real' },
        status: { type: 'string' },
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('orders', callback);
};
