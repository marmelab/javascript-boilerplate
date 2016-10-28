/* eslint jsx-a11y/anchor-has-content: off */
import React from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';
import { OrderIcon } from './orders';
import { ProductIcon } from './products';

const Menu = () => (
    <Paper style={{ flex: '0 0 15em', order: -1 }}>
        <List>
            <ListItem
                containerElement={<Link to="/admin/products" />}
                leftIcon={<ProductIcon />}
                primaryText="Products"
            />
            <ListItem
                containerElement={<Link to="/admin/orders" />}
                leftIcon={<OrderIcon />}
                primaryText="Orders"
            />
        </List>
    </Paper>
);

export default Menu;
