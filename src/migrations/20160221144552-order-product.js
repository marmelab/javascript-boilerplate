'use strict';

exports.up = function (db, callback) {
    db.createTable('order_product', {
        id: { type: 'uuid', primaryKey: true },
        order_id: { type: 'uuid' },
        product_id: { type: 'uuid' },
        quantity: { type: 'int' },
        reference: { type: 'string' },
        width: { type: 'real' },
        height: { type: 'real' },
        price: { type: 'real' },
        thumbnail: { type: 'string' },
        image: { type: 'string' },
        description: { type: 'string' },
    }, callback);
};

exports.down = function (db, callback) {
    db.dropTable('order_product', callback);
};
