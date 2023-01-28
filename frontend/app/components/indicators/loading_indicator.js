import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../features/loading/loadingSlice';
import { primary, button_background } from '../../constants/theme';

export default function Loadingindicator(props) {
    const loading = useSelector(selectLoading);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={loading} color={primary} size="large" hidesWhenStopped={true} style={styles.indicator} />
            </View>
        )
    }

    return (<View></View>)
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '40%',
        left: '38%',
        backgroundColor: button_background,
        borderRadius: 10,
    },
    indicator: {
        padding: 20
    }
})