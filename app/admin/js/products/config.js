export default (nga, admin) => {
    const products = admin.getEntity('products')
        .label('Posters');

    products.listView()
        .title('All Posters')
        .fields([
            nga.field('i', 'template')
                .isDetailLink(true)
                .label('')
                .template('<img src="{{ entry.values.thumbnail }}" class="poster_mini_thumbnail" />'),
            nga.field('reference').isDetailLink(true),
            nga.field('price')
                .cssClasses('hidden-xs'),
            nga.field('width', 'float')
                .format('0.00')
                .cssClasses('hidden-xs'),
            nga.field('height', 'float')
                .format('0.00')
                .cssClasses('hidden-xs'),
            nga.field('stock', 'number')
                .cssClasses('hidden-xs'),
        ])
        .filters([
            nga.field('q', 'template')
                .label('')
                .pinned(true)
                .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
            nga.field('width_gte', 'number')
                .label('Min width'),
            nga.field('width_lte', 'number')
                .label('Max width'),
            nga.field('height_gte', 'number')
                .label('Min height'),
            nga.field('height_lte', 'number')
                .label('Max height'),
            nga.field('stock_lte', 'template')
                .label('Low stock')
                .defaultValue(10),
        ])
        .listActions(['edit', 'delete']);

    products.creationView()
        .title('Create new Poster')
        .fields([
            nga.field('reference')
                .validation({required: true })
                .cssClasses('col-sm-4'),
            nga.field('price')
                .validation({required: true })
                .cssClasses('col-sm-4'),
            nga.field('width', 'float')
                .validation({required: true })
                .cssClasses('col-sm-2'),
            nga.field('height', 'float')
                .validation({required: true })
                .cssClasses('col-sm-2'),
            nga.field('stock', 'number')
                .validation({required: true, min: 2 })
                .cssClasses('col-sm-2'),
            nga.field('thumbnail')
                .validation({required: true })
                .cssClasses('col-sm-4'),
            nga.field('image')
                .validation({required: true })
                .cssClasses('col-sm-4'),
            nga.field('description', 'wysiwyg'),
        ]);

    products.editionView()
        .fields(
            products.creationView().fields(),
        );

    return products;
};
