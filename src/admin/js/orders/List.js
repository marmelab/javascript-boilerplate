import React from 'react';
import { Datagrid, Filter, List, DateField, TextField, EditButton, TextInput } from 'admin-on-rest/src/mui';

export const OrderFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="reference" alwaysOn />
    </Filter>
);

export default (props) => (
    <List {...props} filter={OrderFilter}>
        <Datagrid>
            <DateField label="date" source="date" />
            <TextField label="reference" source="reference" />
            <TextField label="total" source="total" />
            <TextField label="status" source="status" />
            <EditButton basePath="/orders" />
        </Datagrid>
    </List>
);
