import { PropTypes } from 'react';
import { ProductSchema } from '../product/propTypes';

const OrderItemSchema = {
    ...ProductSchema,
    quantity: PropTypes.number.isRequired,
};

const OrderSchema = {
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
};

export default {
    order: PropTypes.shape(OrderSchema),
    item: PropTypes.shape(OrderItemSchema),
};
