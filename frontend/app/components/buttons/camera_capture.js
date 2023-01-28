import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { button_background } from '../../constants/theme';
import AvatarButton from '../buttons/avatar_button'
import Tooltip from 'react-native-walkthrough-tooltip';
import { captureTooltip, end } from '../../features/guide/guideSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function CameraCapture(props) {
    const dispatch = useDispatch();

    const captureTip = useSelector(captureTooltip)

    return (
        <View style={styles.container}>
            <AvatarButton action={() => props.zOut()} icon="minus" />
            <Tooltip
                isVisible={captureTip}
                placement="top"
                content={<Text>Locate RTA parking sign and capture</Text>}
                onClose={() => dispatch(end())}
            >
                <TouchableOpacity onPress={() => props.capture()}>
                    <View style={styles.capture_container} />
                </TouchableOpacity>
            </Tooltip>
            <AvatarButton action={() => props.zIn()} icon="plus" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    capture_container: {
        backgroundColor: button_background,
        borderColor: '#fff',
        borderWidth: 6,
        height: 90,
        width: 90,
        borderRadius: 50
    }
})