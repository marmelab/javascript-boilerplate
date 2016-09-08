/* eslint max-len: off */
import React from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';
import { OrderIcon } from './orders';
import { ProductIcon } from './products';

const Menu = () => (
    <Paper style={{ flex: '0 0 15em', order: -1 }}>
        <List>
            <ListItem key="products" containerElement={<Link to="/products" />} primaryText="Products" leftIcon={<ProductIcon />} />
            <ListItem key="orders" containerElement={<Link to="/orders" />} primaryText="Orders" leftIcon={<OrderIcon />} />
        </List>
    </Paper>
);

export default Menu;
