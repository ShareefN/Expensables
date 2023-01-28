import React from 'react';
import { View, StyleSheet } from 'react-native';
import MainButton from '../buttons/main_button';
import IconButton from '../buttons/icon_button';

export default function VehicleActions(props) {
    return (
        <View style={styles.container}>
            <IconButton title="Edit Vehicle" action={() => props.edit()} margin={0} />
            <View style={styles.dead_view} />
            <MainButton title="Delete Vehicle" action={() => props.delete()} margin={0} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    },
    dead_view: {
        marginVertical: 5
    }
})