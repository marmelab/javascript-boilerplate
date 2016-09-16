import React, { PropTypes } from 'react';
import { Edit, EditButton, DateInput, TextInput, TextField, ReferenceManyField, Datagrid } from 'admin-on-rest/lib/mui';

const Title = ({ record }) => <span>Order {record ? `"${record.reference}"` : ''}</span>;

Title.propTypes = {
    record: PropTypes.object,
};

export default (props) => (
    <Edit title={Title} {...props}>
        <DateInput label="date" source="date" />
        <TextInput label="total" source="total" options={{ type: 'number' }} />
        <TextInput label="status" source="status" />
        <ReferenceManyField label="products" reference="order-products" target="order_id">
            <Datagrid>
                <TextField label="reference" source="reference" />
                <TextField label="quantity" source="quantity" />
                <EditButton />
            </Datagrid>
        </ReferenceManyField>
    </Edit>
);
