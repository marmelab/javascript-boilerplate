import { assert } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';
import { Link } from 'react-router';

import ProductItem from './ProductItem';

describe('Component ProductItem', () => {
    const props = {
        id: 42,
        price: 28.53,
        reference: 'REF-654564',
        thumbnail: 'http://google.fr/image.jpg',
        description: 'Best product ever',
        orderProduct: sinon.spy(),
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
        assert(
            wrapper.contains(<Link to={'/products/42'} className="card-link">Details</Link>),
            'ProductItem should contains a link to specified product'
        );
    });

    it('should contain correct order link', () => {
        const wrapper = shallow(<ProductItem {...props} />);
        const link = wrapper.find('a');
        assert(link, 'ProductItem should contains a link to buy product');

        link.simulate('click');
        assert(props.orderProduct.called, 'orderProduct func should be called');
    });
});
