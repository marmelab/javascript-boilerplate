import { PropTypes } from 'react';

export const ProductSchema = {
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    reference: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
};

export default PropTypes.shape(ProductSchema);
