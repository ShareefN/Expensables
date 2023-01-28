import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { getZones } from '../../controllers/zone';

export default function Zones(props) {
    const [zones, setZones] = useState([]);
    const [isOpen, setOpen] = useState(false)

    useEffect(() => { getAllParkingZones() }, [])

    const getAllParkingZones = async () => {
        let result = await getZones();
        setZones(result)
    }

    const { select, value } = props;

    return (
        <DropDownPicker
            placeholder='Zone'
            schema={{
                label: 'zone',
                value: '_id'
            }}
            open={isOpen}
            autoScroll={true}
            value={value}
            dropDownDirection="AUTO"
            items={zones}
            setOpen={setOpen}
            onSelectItem={(value) => select(value._id)}
            containerStyle={{ width: '30%' }}
        />
    )
}