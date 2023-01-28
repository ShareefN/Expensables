import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Caption } from 'react-native-paper';
import { primary, input_background } from '../../constants/theme';

export default function ParkingHour(props) {
    const { hour, value } = props.elm;
    const { active, select } = props;

    return (
        <TouchableOpacity onPress={() => select(props.elm)}>
            <View style={active ? styles.active_container : styles.inactive_container}>
                <Text>{`${hour ?? 0} hr`}</Text>
                <Caption>{`${value ?? 0} AED`}</Caption>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    active_container: {
        borderWidth: 1,
        borderColor: primary,
        backgroundColor: input_background,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 10
    },
    inactive_container: {
        borderWidth: 0,
        backgroundColor: input_background,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        opacity: 0.5,
        marginRight: 10
    }
})

