import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectVehicles } from '../../features/vehicles/vehiclesSlice';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Vehicles(props) {
    const vehicles = useSelector(selectVehicles);

    const [isOpen, setOpen] = useState(false)

    const { select, value } = props;

    return (
        <DropDownPicker
            placeholder='Select Vehicle'
            name="vehicles"
            schema={{
                label: 'nickname',
                value: '_id'
            }}
            open={isOpen}
            dropDownDirection="AUTO"
            autoScroll={true}
            value={value}
            items={vehicles}
            setOpen={setOpen}
            onSelectItem={(value) => select(value._id)}
            containerProps={Platform.OS === 'android' && isOpen && styles.androidContainer}
            containerStyle={{ width: '85%' }}
        />
    )
}

const styles = StyleSheet.create({
    androidContainer: {
        height: 250
    }
})