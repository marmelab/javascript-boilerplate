import React from 'react';
import { Create, TextInput } from 'admin-on-rest/lib/mui';

export default props => (
    <Create title="Create a Post" {...props}>
        <TextInput label="Reference" source="reference" />
        <TextInput label="price" source="price" options={{ type: 'number' }} />
        <TextInput label="width" source="width" options={{ type: 'number' }} />
        <TextInput label="height" source="height" options={{ type: 'number' }} />
        <TextInput label="stock" source="stock" options={{ type: 'number' }} />
    </Create>
);
