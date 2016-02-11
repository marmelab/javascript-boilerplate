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
                .targetField(nga.field('reference'))
                .remoteComplete(true, {
                    searchQuery: (search) => { return {q: search}; },
                }),
            // nga.field('customer_id', 'reference')
            //     .label('Customer')
            //     .targetEntity(admin.getEntity('customers'))
            //     .targetField(nga.field('last_name').map((v, e) => e.first_name + ' ' + e.last_name))
            //     .singleApiCall(ids => ({ 'id': ids }))
            //     .cssClasses('hidden-xs'),
            nga.field('total')
                .label('Price')
                .cssClasses('hidden-xs'),
            nga.field('status'),
        ])
        .filters([
            nga.field('q', 'template')
                .label('')
                .pinned(true)
                .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
            // nga.field('customer_id', 'reference')
            //     .label('Customer')
            //     .targetEntity(admin.getEntity('customers'))
            //     .targetField(nga.field('last_name').map((v, e) => e.first_name + ' ' + e.last_name))
            //     .remoteComplete(true, {
            //         searchQuery: function(search) { return { q: search }; }
            //     }),
            nga.field('status', 'choice')
                .choices([
                    { label: 'ordered', value: 'ordered' },
                    { label: 'delivered', value: 'delivered' },
                    { label: 'cancelled', value: 'cancelled' },
                ]),
            nga.field('date_gte', 'datetime')
                .label('Passed since'),
            nga.field('date_lte', 'datetime')
                .label('Passed before'),
            nga.field('total_gte')
                .label('Min price'),
        ])
        .listActions(['edit', 'delete']);

    orders.creationView()
        .title('New Order')
        .fields([
            nga.field('date', 'datetime'),
            // nga.field('customer_id', 'reference')
            //     .label('Customer')
            //     .targetEntity(admin.getEntity('customers'))
            //     .targetField(nga.field('last_name').map((v, e) => e.first_name + ' ' + e.last_name))
            //     .editable(false),
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
            // nga.field('customer_id', 'reference')
            //     .label('Customer')
            //     .targetEntity(admin.getEntity('customers'))
            //     .targetField(nga.field('last_name').map((v, e) => e.first_name + ' ' + e.last_name))
            //     .editable(false),
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
