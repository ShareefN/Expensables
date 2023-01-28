import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Caption, Button } from 'react-native-paper';
import { primary, input_background, secondary } from '../../constants/theme';
import moment from 'moment';

export default function ParkingItem(props) {
    const { is_motorcycle, plate_code, plate_number, nickname } = props.vehicle;
    const { _id, zone, zone_code, total_duration, hide, createdAt } = props.parking;

    return (
        <View style={styles.container}>
            <View style={styles.left_container}>
                <Avatar.Icon size={35} icon={is_motorcycle ? "motorbike" : "car-hatchback"} color={primary} style={{ backgroundColor: 'transparent' }} />
                <View style={styles.vehicle_container}>
                    <Text variant="titleMedium">{!nickname?.length ? 'No Nickname' : nickname}</Text>
                    <Text variant="titleMedium">{`${plate_code ? plate_code + ' - ' : ''}${plate_number} - ${zone_code}${zone?.zone}`}</Text>
                    <Caption>{moment(createdAt).format('hh:mm A')} - {moment(createdAt).add(total_duration, 'hours').format('hh:mm A')} - {total_duration} hours</Caption>
                    <Caption style={styles.black_text}>{moment(createdAt).format('DD-MM-YY')}</Caption>
                </View>
            </View>
            <View style={styles.menu_padding}>
                <Button icon={'eye-off-outline'} onPress={() => props.toggle(_id, { hide: !hide })} textColor={secondary} />
                <Caption style={[styles.caption_text, styles.black_text]}>{"Hide"}</Caption>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
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
        paddingLeft: 30,
        alignItems: 'center'
    },
    caption_text: {
        paddingRight: 10,
    },
    black_text: {
        color: 'black'
    }
})