import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import { Link } from 'react-router';

import ProductItem from './ProductItem';

describe('Component ProductItem', () => {
    const props = {
        product: {
            id: 42,
            price: 28.53,
            reference: 'REF-654564',
            thumbnail: 'http://google.fr/image.jpg',
            description: 'Best product ever',
        },
        orderProduct: createSpy(),
    };

    it('should display the correct reference', () => {
        const wrapper = shallow(<ProductItem {...props} />);
        expect(wrapper.find('h4').text()).toEqual('REF-654564');
    });

    it('should display the correct price', () => {
        const wrapper = shallow(<ProductItem {...props} />);
        expect(wrapper.find('h6').text()).toEqual('$28.53');
    });

    it('should display the correct description', () => {
        const wrapper = shallow(<ProductItem {...props} />);
        expect(wrapper.find('p.card-text').text()).toEqual('Best product ever');
    });

    it('should display the correct thumbnail', () => {
        const wrapper = shallow(<ProductItem {...props} />);
        expect(wrapper.find('img').prop('src')).toEqual('http://google.fr/image.jpg');
    });

    it('should contain correct product details link', () => {
        const wrapper = shallow(<ProductItem {...props} />);
        const containsLink = wrapper.contains(<Link to={'/products/42'} className="card-link">Details</Link>);
        expect(containsLink).toBe(true, 'ProductItem should contains a link to specified product');
    });

    it('should contain correct order link', () => {
        const wrapper = shallow(<ProductItem {...props} />);
        const link = wrapper.find('a');
        expect(link).toExist('ProductItem should contains a link to buy product');

        link.simulate('click');
        expect(props.orderProduct).toHaveBeenCalled('orderProduct func should be called');
    });
});
