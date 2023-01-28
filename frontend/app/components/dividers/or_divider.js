import React from 'react';
import { Divider, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { secondary } from '../../constants/theme';

export default function OrDivider(props) {

    return (
        <View style={styles.container}><Divider style={styles.divider} /><Text variant="titleMedium">OR</Text><Divider style={styles.divider} /></View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 20
    },
    divider: {
        borderWidth: 0.3,
        width: '33%',
        borderColor: secondary,
    }
})
