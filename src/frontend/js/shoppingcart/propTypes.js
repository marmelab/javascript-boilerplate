import { PropTypes } from 'react';
import { ProductSchema } from '../product/propTypes';

const ShoppingCartItemSchema = {
    ...ProductSchema,
    quantity: PropTypes.number.isRequired,
};

export default PropTypes.shape(ShoppingCartItemSchema);
