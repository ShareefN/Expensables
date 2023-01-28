import React from 'react';
import { View, StyleSheet, Platform, Linking } from 'react-native';
import { Text } from 'react-native-paper';
import UpdateAppIcon from '../../assets/update_app.svg';
import MainButton from '../buttons/main_button';
import IconButton from '../../components/buttons/icon_button';
import { ios_store_link, android_store_link } from '../../constants/constants';

export default function UpdareRequiered(props) {
    const { close } = props;

    onUpdatepress = () => {
        let _link;
        if (Platform.OS === 'android') _link = android_store_link;
        else _link = ios_store_link;

        Linking.openURL(_link);
    }

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>Update Required</Text>
            <View style={styles.dead_view} />
            <View style={styles.iconContainer}>
                <UpdateAppIcon width={200} height={200} />
            </View>
            <View style={styles.dead_view} />
            <Text variant="titleMedium" style={styles.content}>We published a new app version, it includes some improvements to the one you have now!</Text>
            <View style={styles.dead_view} />
            <MainButton title="Update App!" action={() => onUpdatepress()} margin={0} />
            <View style={styles.small_dead_view} />
            <IconButton title="Skip for now" action={() => close()} margin={0} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        justifyContent: 'flex-start'
    },
    content: {
        textAlign: 'center'
    },
    dead_view: {
        marginVertical: 20
    },
    small_dead_view: {
        marginVertical: 10
    }
})