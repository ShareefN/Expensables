import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, Linking, Platform } from 'react-native';
import { RTA_WHATSAPP, RTA_SMS } from "@env"
import { Text, Caption, FAB } from 'react-native-paper';
import { userVehicles } from '../../controllers/vehicle';
import Vehicles from '../dropdown/vehicles_dropdown';
import Zones from '../dropdown/zones_dropdown';
import PrimaryInput from '../inputs/primary_input';
import MainButton from '../buttons/main_button';
import ParkingTiming from '../containers/parking_timing';
import { errorToast } from '../toast/toast';
import { parkingMessage, createParking, checkParking } from '../../controllers/parking';
import { logEvent } from '../../controllers/firebase';
import Loadingindicator from '../indicators/loading_indicator';
import { selectVehicles } from '../../features/vehicles/vehiclesSlice';
import { useSelector } from 'react-redux';
import { primary } from '../../constants/theme';

export default function CreateParking(props) {
    const vehicles = useSelector(selectVehicles);

    useEffect(() => {
        (async () => {
            await userVehicles();
            if (vehicles.length === 0) props.createVehicle()
        })();
    }, [])

    const [parking, setParking] = useState({
        zone: props?.zone ?? null,
        vehicle: vehicles[0]?._id ?? null,
        total_duration: {
            hour: null,
            value: null
        },
        zone_code: props?.zone_code ?? null
    })

    onInputChange = (key, value) => {
        if (key === 'zone_code') {
            if (value.length === 3) Keyboard.dismiss();
        }
        setParking({ ...parking, [key]: value })
    }

    onSubmitPress = async (type) => {
        if (!parking.vehicle) return errorToast('Vehicle Required', 'Please provide a parking vehicle');
        if (!parking.zone) return errorToast('Zone Required', 'Please provide a parking zone')
        if (!parking.zone_code) return errorToast('Zone Code Required', 'Please provide a parking zone code');
        if (!parking.total_duration.hour) return errorToast('Parking Hours Required', 'Please provide parking hours');

        let _message = await parkingMessage(parking);

        let result = await checkParking(parking);

        if (result === 400) return props.close();


        if (type === 'sms') return onSmsSend(_message);

        onWhatappSend(_message);
    }

    onWhatappSend = async (message) => {
        let url = `whatsapp://send?text=${message}&phone=${RTA_WHATSAPP}`
        Linking.openURL(url).then(async (data) => await createParking(parking, () => onRequestEnd('whatsapp'))).catch(error => errorToast('WhatsApp Error', 'Error opening WhatsApp'))
    }

    onSmsSend = async (message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${RTA_SMS}${separator}body=${message}`
        Linking.openURL(url).then(async (data) => await createParking(parking, () => onRequestEnd('sms'))).catch(error => errorToast('SMS Error', 'Error Sending message via SMS'))
    }

    onRequestEnd = (method) => {
        if (method === 'sms') logEvent("paid_via_sms")
        if (method === 'whatsapp') logEvent("paid_via_whatsapp")
        if (props?.zone && props?.zone_code) logEvent("create_parking_via_image_capture", { zone: parking.zone, code: parking.zone_code, duration: parking.total_duration, vehicle: parking.vehicle })
        if (!props.zone && !props.zone_code) logEvent("create_parking_via_manual_input", { zone: parking.zone, code: parking.zone_code, duration: parking.total_duration, vehicles: parking.vehicle })

        props.rating()
    }

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">Create Parking</Text>
            <View style={styles.full_width}>
                <View style={styles.dead_view} />
                <View style={styles.vehicle_container}>
                    <Vehicles select={(i) => onInputChange('vehicle', i)} value={parking.vehicle} />
                    <FAB
                        icon="plus"
                        style={styles.fab}
                        size="small"
                        onPress={() => props.createVehicle()}
                        mode="flat"
                        color={primary}
                    />
                </View>
                <View style={styles.dead_view} />
                <View style={[styles.zone_code_view]}>
                    <Zones select={(i) => onInputChange('zone', i)} value={parking.zone} />
                    <View style={{ width: '67%', marginTop: -16 }}>
                        <PrimaryInput title="Zone Code" action={(i) => onInputChange('zone_code', i)} type="number-pad" value={parking.zone_code} maxlength={3} />
                    </View>
                </View>
            </View>

            <View style={[styles.full_width, { zIndex: -5 }]}>
                <View style={styles.small_dead_view} />
                {parking?.zone ? <ParkingTiming zone={parking.zone} total={parking.total_duration} select={(e) => onInputChange('total_duration', e)} /> : null}
                <View style={styles.dead_view} />
                <MainButton title="Send message via What's App" action={() => onSubmitPress('whatsapp')} margin={0} />
                <View style={styles.small_dead_view} />
                <MainButton title="Send message via SMS" action={() => onSubmitPress('sms')} margin={0} />
                <Caption>SMS courier charges 30 fils</Caption>
            </View>
            <Loadingindicator />
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
        paddingHorizontal: 20,
    },
    dead_view: {
        marginVertical: 10
    },
    small_dead_view: {
        marginVertical: 5
    },
    full_width: {
        width: '100%',
    },
    zone_view: {
        width: '100%'
    },
    zone_code_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    fab: {
        backgroundColor: "transparent",
    },
    vehicle_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 99
    }
})