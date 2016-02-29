import { PropTypes } from 'react';

export const ProductPropType = {
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    reference: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
};
