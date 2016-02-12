const initialState = {
    products: [{
        id: 'foo',
        name: 'Foo',
        description: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
        price: 29.99,
    }, {
        id: 'foo2',
        name: 'Foo2',
        description: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
        price: 29.99,
    }],

    product: {
        id: 'foo',
        name: 'Selected Foo',
        description: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
        price: 29.99,
    },
};

export default (state = initialState) => {
    return state;
};
