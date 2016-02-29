import chai, { assert } from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';

import '../test/setupJsdom';
import ProductItem from './ProductItem';

chai.use(chaiEnzyme());

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
        assert.deepEqual(wrapper.find('img').node.props.src, 'http://google.fr/image.jpg');
    });
});
