import React from 'react';
import { Filter, List, DateField, TextField, EditButton, TextInput } from 'admin-on-rest/lib/mui';

export const OrderFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="reference" alwaysOn />
    </Filter>
);

export default (props) => (
    <List {...props} filter={OrderFilter}>
        <DateField label="date" source="date" />
        <TextField label="reference" source="reference" />
        <TextField label="total" source="total" />
        <TextField label="status" source="status" />
        <EditButton basePath="/orders" />
    </List>
);
