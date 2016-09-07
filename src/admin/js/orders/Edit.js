import React, { PropTypes } from 'react';
import { Edit, EditButton, DateInput, TextInput, TextField, ReferenceManyField, Datagrid } from 'admin-on-rest/src/mui';

const Title = ({ record }) => <span>Order {record ? `"${record.reference}"` : ''}</span>;

Title.propTypes = {
    record: PropTypes.object.isRequired,
};

export default (props) => (
    <Edit title={Title} {...props}>
        <DateInput label="date" source="date" />
        <TextInput label="total" source="total" options={{ type: 'number' }} />
        <TextInput label="status" source="status" />
        <ReferenceManyField reference="order-products" target="order_id">
            <Datagrid>
                <TextField source="reference" />
                <TextField source="quantity" />
                <EditButton />
            </Datagrid>
        </ReferenceManyField>
    </Edit>
);
