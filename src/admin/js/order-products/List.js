import React from 'react';
import { Datagrid, Filter, List, TextField, EditButton, TextInput } from 'admin-on-rest/lib/mui';

export const ProductFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="reference" alwaysOn />
    </Filter>
);

export default props => (
    <List {...props} filter={ProductFilter}>
        <Datagrid>
            <TextField label="reference" source="reference" />
            <TextField label="price" source="price" />
            <TextField label="width" source="width" />
            <TextField label="height" source="height" />
            <TextField label="quantity" source="stock" />
            <EditButton basePath="/order-products" />
        </Datagrid>
    </List>
);
