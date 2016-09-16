import React from 'react';
import { Create, DateInput, TextInput } from 'admin-on-rest/lib/mui';

export default (props) => (
    <Create title="Create an Order" {...props}>
        <DateInput label="date" source="date" />
        <TextInput label="total" source="total" options={{ type: 'number' }} />
        <TextInput label="status" source="status" />
    </Create>
);
