import React from 'react';
import { StyleSheet, View } from 'react-native';
import FreeParkinglogo from '../../assets/free_parking.svg';
import { Text, Caption } from 'react-native-paper';

export default function FreeParking(props) {
    const { zone, start_time, end_time } = props.zone;

    return (
        <View style={styles.container}>
            <FreeParkinglogo width={300} height={200} />
            <Text variant="headlineMedium">Free Parking</Text>
            <Caption style={styles.center_text}>Paid parking in zone {zone} is from {start_time} AM - {end_time} PM</Caption>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
        top: 10,
        opacity: 0.9
    },
    center_text: {
        textAlign: 'center'
    }
})