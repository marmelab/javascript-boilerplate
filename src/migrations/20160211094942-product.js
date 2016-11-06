'use strict';

exports.up = function (db, callback) {
    db.createTable('product', {
        id: { type: 'uuid', primaryKey: true },
        reference: { type: 'string' },
        width: { type: 'real' },
        height: { type: 'real' },
        price: { type: 'real' },
        thumbnail: { type: 'string' },
        image: { type: 'string' },
        description: { type: 'string' },
        stock: { type: 'int' },
    }, callback);
};

exports.down = function (db, callback) {
    db.dropTable('product', callback);
};
