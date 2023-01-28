import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { primary } from '../../constants/theme';

export default function MainButton(props) {
    const { title, action, loading, margin } = props;

    return (
        <Button mode="contained" onPress={() => action()} buttonColor={primary} style={[styles.container, { marginHorizontal: margin ?? styles.container.marginHorizontal }]} loading={loading}>
            {title}
        </Button>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        marginHorizontal: 20
    }
})