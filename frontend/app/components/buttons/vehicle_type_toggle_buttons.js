import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { secondary, primary } from '../../constants/theme';

export default function ToggleButtons(props) {
    const { is_motorcycle = false, toggle } = props;

    return (
        <View style={styles.container}>
            <Button icon="car-hatchback" mode="outlined" onPress={() => toggle(false)} textColor='black' style={!is_motorcycle ? styles.active_container : styles.inactive_container}>
                Car
            </Button>
            <Button icon="motorbike" mode="outlined" onPress={() => toggle(true)} textColor='black' style={is_motorcycle ? styles.active_container : styles.inactive_container}>
                Motorcycle
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    active_container: {
        borderRadius: 5,
        width: Dimensions.get('window').width / 2.3,
        borderColor: primary,
        textColor: primary
    },
    inactive_container: {
        borderRadius: 5,
        width: Dimensions.get('window').width / 2.3,
        borderColor: secondary,
        opacity: 0.6
    }
})