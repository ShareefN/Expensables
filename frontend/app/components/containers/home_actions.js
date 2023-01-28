import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CameraCapture from '../buttons/camera_capture';
import AvatarButton from '../buttons/avatar_button'
import Tooltip from 'react-native-walkthrough-tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { vehicleTooltip, manualTooltip, next, end } from '../../features/guide/guideSlice';
import { shareApp } from '../../utils/share_app';

export default function HomeActions(props) {
    const { capture, profile, vehicles, support, manual, device, camera, zoomIn, zoomOut } = props;

    const dispatch = useDispatch();

    const vehicleTip = useSelector(vehicleTooltip)
    const manualTip = useSelector(manualTooltip);

    return (
        <View style={styles.container}>
            <View style={styles.upper_container}>
                <View style={styles.upper_right_container}>
                    <AvatarButton action={() => profile()} icon="account" />
                    <View style={styles.col_spacing} />
                    <AvatarButton action={() => shareApp()} icon="export-variant" />
                </View>
                <View style={styles.upper_right_container}>
                    <Tooltip
                        isVisible={vehicleTip}
                        content={<Text>Register Your Vehicles</Text>}
                        placement="left"
                        onClose={() => dispatch(next({ manual: true }))}
                    >
                        <AvatarButton action={() => vehicleTip ? null : vehicles()} icon="car" />
                    </Tooltip>
                    <View style={styles.col_spacing} />
                    <Tooltip
                        isVisible={manualTip}
                        content={<Text>Manually Create Parking</Text>}
                        placement="left"
                        onClose={() => dispatch(next({ capture: true }))}
                    >
                        <AvatarButton action={() => manualTip ? null : manual()} icon="form-textbox" />
                    </Tooltip>
                    <View style={styles.col_spacing} />
                    <AvatarButton action={() => support()} icon="chat-question-outline" />
                    {!device ? <>
                        <View style={styles.col_spacing} />
                        <AvatarButton action={() => camera()} icon="camera-wireless-outline" />
                    </> : null}
                </View>
            </View>
            {device ? <CameraCapture capture={capture} zIn={() => zoomIn()} zOut={() => zoomOut()} /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20
    },
    upper_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    upper_right_container: {
        flexDirection: 'column'
    },
    col_spacing: {
        height: 15
    }
})