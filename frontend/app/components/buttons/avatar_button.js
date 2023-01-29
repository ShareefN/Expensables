import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { button_background } from '../../constants/theme';
import { Button } from 'react-native-paper';

export default function AvatarButton(props) {
    return (
        <TouchableOpacity onPress={() => props.action()}>
            <View style={styles.container} >
                <Button icon={props.icon} textColor='#fff' />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: button_background,
        borderColor: '#fff',
        borderWidth: 0,
        height: 50,
        width: 50,
        borderRadius: 10,
        justifyContent: 'center'
    },
})