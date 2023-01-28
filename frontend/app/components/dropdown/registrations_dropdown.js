import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectRegistration } from '../../features/registrations/registrationSlice';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Registrations(props) {
    const registrations = useSelector(selectRegistration)

    const [isOpen, setOpen] = useState(false)

    const { select, value } = props;

    return (
        <DropDownPicker
            placeholder='Select Vehicle Registration'
            schema={{
                label: 'origin',
                value: '_id'
            }}
            open={isOpen}
            autoScroll={true}
            value={value}
            items={registrations}
            setOpen={setOpen}
            onSelectItem={(value) => select(value._id)}
        />

    )
}