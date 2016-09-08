import React, { PropTypes } from 'react';
import { Edit, TextInput } from 'admin-on-rest/lib/mui';

const Title = ({ record }) => <span>{record ? record.reference : ''}</span>;

Title.propTypes = {
    record: PropTypes.object.isRequired,
};

export default (props) => (
    <Edit title={Title} {...props}>
        <TextInput label="Reference" source="reference" />
        <TextInput label="price" source="price" options={{ type: 'number' }} />
        <TextInput label="width" source="width" options={{ type: 'number' }} />
        <TextInput label="height" source="height" options={{ type: 'number' }} />
        <TextInput label="stock" source="stock" options={{ type: 'number' }} />
    </Edit>
);
