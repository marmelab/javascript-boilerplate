import React, { PropTypes } from 'react';
import { Edit, DateInput, TextInput } from 'admin-on-rest/lib/mui';

const Title = ({ record }) => <span>Order {record ? `"${record.reference}"` : ''}</span>;

Title.propTypes = {
    record: PropTypes.object.isRequired,
};

export default (props) => (
    <Edit title={Title} {...props}>
        <DateInput label="date" source="date" />
        <TextInput label="total" source="total" options={{ type: 'number' }} />
        <TextInput label="status" source="status" />
    </Edit>
);
