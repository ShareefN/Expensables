import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Avatar, Caption } from 'react-native-paper';
import moment from 'moment';
import { primary, input_background } from '../../constants/theme';
import MenuIcon from '../../assets/buttons/menu_dots.svg';
import BottomUpModal from '../../components/modal/bottom_up_modal';
import VehicleActions from './vehicle_actions';
import CreateVehicle from '../forms/create_vehicle';
import { deleteVehicle } from '../../controllers/vehicle';

export default function VehicleItem(props) {
    const { _id, createdAt, is_motorcycle, plate_code, plate_number, nickname } = props.vehicle;
    const { code } = props.vehicle.registration;

    const [content, setContent] = useState(null);

    onEditVehicle = () => {
        setContent(<CreateVehicle close={() => setContent(null)} vehicle={props.vehicle} />)
    }

    onDeleteVehicle = () => {
        deleteVehicle(_id, () => {
            setContent(null)
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.left_container}>
                <Avatar.Icon size={35} icon={is_motorcycle ? "motorbike" : "car-hatchback"} color={primary} style={{ backgroundColor: 'transparent' }} />
                <View style={styles.vehicle_container}>
                    <Text variant="titleMedium">{!nickname?.length ? 'No Nickname' : nickname}</Text>
                    <Text variant="titleMedium">{`${code} ${plate_code ? plate_code + ' - ' : ''}${plate_number}`}</Text>
                    <Caption>{moment(createdAt).format('MMMM DD YYYY')}</Caption>
                </View>
            </View>
            <TouchableOpacity onPress={() => setContent(<VehicleActions edit={() => onEditVehicle()} delete={() => onDeleteVehicle()} />)} style={styles.menu_padding}>
                <MenuIcon width={50} />
            </TouchableOpacity>
            <BottomUpModal content={content} close={() => setContent(null)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        marginTop: 20,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: input_background,
        flexDirection: 'row',
        alignItems: 'center'
    },
    left_container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    vehicle_container: {
        paddingLeft: 10
    },
    menu_padding: {
        paddingVertical: 30,
        paddingHorizontal: 10
    }
})