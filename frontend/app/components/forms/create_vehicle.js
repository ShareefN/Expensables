import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Caption } from 'react-native-paper';
import ToggleButtons from '../buttons/vehicle_type_toggle_buttons';
import { getRegistrations } from '../../controllers/registration';
import Registrations from '../dropdown/registrations_dropdown';
import PrimaryInput from '../inputs/primary_input';
import MainButton from '../buttons/main_button';
import { errorToast } from '../toast/toast';
import { createVehicle, editVehicle } from '../../controllers/vehicle';
import { logEvent } from '../../controllers/firebase';
import { plateNumberValidation } from '../../utils/regex';

export default function CreateVehicle(props) {
    const [loading, setLoading] = useState(false);
    const [vehicle, setVehicle] = useState({
        nickname: props?.vehicle?.nickname ?? null,
        plate_code: props?.vehicle?.plate_code ?? null,
        plate_number: props?.vehicle?.plate_number,
        registration: props?.vehicle?.registration._id,
        is_motorcycle: props?.vehicle?.is_motorcycle ?? false,
    })

    useEffect(() => {
        getRegistrations();
    }, [])

    onInputChange = (key, value) => {
        setVehicle({ ...vehicle, [key]: value })
    }

    onSubmitPress = () => {
        if (!vehicle.registration) return errorToast('Registrations Required', 'Please select registration for your vehicle')
        if (!vehicle.nickname) return errorToast('Nickname Required', 'Please add a nickname for this vehicle')
        if (!vehicle.plate_number) return errorToast('Plate Number Required', 'Please provide a plate number for this vehicle')
        if (!plateNumberValidation(vehicle.plate_number)) return errorToast('Plate Number Invalid', 'Vehicle plate number can only include numbers')

        setLoading(true);

        if (props.vehicle) {
            onEditPress()
        } else {
            onCreatePress()
        }
    }

    onCreatePress = () => {
        createVehicle(vehicle, () => {
            logEvent('vehicle_editted', { vehicle })
            setLoading(false)
            props.close();
        });
    }

    onEditPress = () => {
        const { _id } = props.vehicle;

        editVehicle(_id, vehicle, () => {
            logEvent('vehicle_editted', { vehicle })
            setLoading(false)
            props.close();
        })
    }

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">{props.vehicle ? 'Edit Vehicle' : 'Register Vehicle'}</Text>
            <View style={styles.dead_view} />
            <ToggleButtons is_motorcycle={vehicle.is_motorcycle} toggle={(bool) => onInputChange('is_motorcycle', bool)} />
            <View style={styles.dead_view} />
            <Registrations select={(i) => onInputChange('registration', i)} value={vehicle.registration} />
            <View style={styles.full_width}>
                <PrimaryInput title="Nickname" action={(i) => onInputChange('nickname', i)} value={vehicle.nickname} maxlength={20} />
                <View style={styles.plate_view}>
                    <View style={{ width: '30%' }}>
                        <PrimaryInput title="Code" action={(i) => onInputChange('plate_code', i)} value={vehicle.plate_code} maxlength={4} />
                        <Caption>If Applicable</Caption>
                    </View>
                    <View style={{ width: '67%' }}>
                        <PrimaryInput title="Plate Number" action={(i) => onInputChange('plate_number', i)} type="number-pad" value={vehicle.plate_number} maxlength={10} />
                    </View>
                </View>
                <View style={styles.dead_view} />
                <MainButton title={props.vehicle ? "Edit Vehicle" : "Create Vehicle"} loading={loading} action={() => onSubmitPress()} margin={0} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        marginTop: 20,
        paddingHorizontal: 20
    },
    dead_view: {
        marginVertical: 10
    },
    full_width: {
        width: '100%'
    },
    plate_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
})