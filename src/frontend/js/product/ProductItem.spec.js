import { assert } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import { Link } from 'react-router';

import '../test/setupJsdom';
import ProductItem from './ProductItem';

describe('Component ProductItem', () => {
    const props = {
        id: 42,
        price: 28.53,
        reference: 'REF-654564',
        thumbnail: 'http://google.fr/image.jpg',
        description: 'Best product ever',
    };

    it('should display the correct reference', () => {
        const wrapper = shallow(<ProductItem {...props} />);
        assert.deepEqual(wrapper.find('h4').text(), 'REF-654564');
    });

    it('should display the correct price', () => {
        const wrapper = shallow(<ProductItem {...props} />);
        assert.deepEqual(wrapper.find('h6').text(), '$28.53');
    });

    it('should display the correct description', () => {
        const wrapper = shallow(<ProductItem {...props} />);
        assert.deepEqual(wrapper.find('p.card-text').text(), 'Best product ever');
    });

    it('should display the correct thumbnail', () => {
        const wrapper = shallow(<ProductItem {...props} />);
        assert.deepEqual(wrapper.find('img').prop('src'), 'http://google.fr/image.jpg');
    });

    it('should contain correct product details link', () => {
        const wrapper = shallow(<ProductItem {...props} />);
        assert(wrapper.contains(<Link to={'/products/42'} className="card-link">Details</Link>));
    });

    it('should contain correct order link', () => {
        const wrapper = shallow(<ProductItem {...props} />);
        assert(wrapper.contains(<Link to={'/order/42'} className="card-link">Order</Link>));
    });
});
