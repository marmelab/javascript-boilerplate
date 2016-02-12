const initialState = {
    orders: [{
        id: 'order1',
        reference: 'O1',
        date: new Date(),
        customer_id: 1,
        total: 29.99,
        status: 'pending',

    }],
    order: {},
};

export default (state = initialState) => {
    return state;
};
