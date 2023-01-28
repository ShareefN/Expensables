import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { primary } from '../../constants/theme';

export default function ActionText(props) {
    const { title, action } = props;

    return (
        <TouchableOpacity onPress={() => action()}>
            <Text variant="bodyMedium" style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        color: primary,
        textAlign: 'center'
    }
})