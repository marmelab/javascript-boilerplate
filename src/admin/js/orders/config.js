export default (nga, admin) => {
    const orders = admin.getEntity('orders');

    orders.listView()
        .sortField('date')
        .sortDir('DESC')
        .fields([
            nga.field('date', 'datetime'),
            nga.field('reference', 'reference')
                .label('Product')
                .isDetailLink(true)
                .targetEntity(admin.getEntity('products'))
                .targetField(nga.field('reference')),
            nga.field('total')
                .label('Price')
                .cssClasses('hidden-xs'),
            nga.field('status'),
        ])
        .listActions(['edit', 'delete']);

    orders.creationView()
        .title('New Order')
        .fields([
            nga.field('date', 'datetime'),
            nga.field('reference', 'reference')
                .label('Product')
                .targetEntity(admin.getEntity('products'))
                .targetField(nga.field('reference')),
            nga.field('total')
                .label('Price'),
            nga.field('status', 'choice')
                .choices([
                    { label: 'ordered', value: 'ordered' },
                    { label: 'delivered', value: 'delivered' },
                    { label: 'cancelled', value: 'cancelled' },
                ])
                .cssClasses('col-sm-4 col-lg-2'),
        ]);

    orders.editionView()
        .title('Order #{{ entry.values.reference }}')
        .fields([
            nga.field('date', 'datetime'),
            nga.field('reference', 'reference')
                .label('Product')
                .targetEntity(admin.getEntity('products'))
                .targetField(nga.field('reference'))
                .editable(false),
            nga.field('total')
                .label('Price'),
            nga.field('status', 'choice')
                .choices([
                    { label: 'ordered', value: 'ordered' },
                    { label: 'delivered', value: 'delivered' },
                    { label: 'cancelled', value: 'cancelled' },
                ])
                .cssClasses('col-sm-4 col-lg-2'),
        ]);

    return orders;
};
