import React, { useEffect, useState, useRef } from 'react';
import { View, Linking, StyleSheet } from 'react-native';
import { permission } from '../utils/permissions';
import { routes } from '../constants/routes';
import { styles } from '../constants/styles';
import ConfirmationDialog from '../components/dialog/confirmation_dialog';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import HomeActions from '../components/containers/home_actions';
import BottomUpModal from '../components/modal/bottom_up_modal';
import Support from '../components/forms/support';
import CreateParking from '../components/forms/create_parking';
import { detectText } from '../controllers/aws';
import CameraDeniedIcon from '../assets/cameradenied.svg';
import { userVehicles } from '../controllers/vehicle';
import CreateVehicle from '../components/forms/create_vehicle';
import { getZoneByChar } from '../controllers/zone';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, selectLoading } from '../features/loading/loadingSlice';
import { errorToast } from '../components/toast/toast';
import { max_zoom, min_zoom } from '../constants/constants';
import { useIsFocused } from '@react-navigation/native';
import { vehicleTooltip, manualTooltip } from '../features/guide/guideSlice';
import { readFirstParking, setFirstparking } from '../utils/persisted_storage'
import InAppReview from 'react-native-in-app-review';

export default function Home({ navigation }) {
    const isFocused = useIsFocused();
    const loading = useSelector(selectLoading);
    const vToolTip = useSelector(vehicleTooltip);
    const mToolTop = useSelector(manualTooltip);
    const camera = useRef(null)
    const dispatch = useDispatch();
    let devices = useCameraDevices()
    let device = devices.back
    const [zoom, setZoom] = useState(2)

    useEffect(() => {
        if (!vToolTip || !mToolTop) { permission(getPermissionDialog) }
        userVehicles()
    }, [isFocused, vToolTip, mToolTop])

    const [content, setContent] = useState(null)
    const [zone, setZoneData] = useState({
        zone: null,
        zone_code: null
    })
    const [dialogContent, setDialogContent] = useState({
        visible: false,
        title: null,
        message: null,
        action: null,
        dismiss: null
    });

    const getPermissionDialog = () => {
        setDialogContent({
            visible: true,
            title: 'Permission Requiered',
            message: 'We need your permission to access the camera',
            action: () => Linking.openSettings(),
            dismiss: () => setDialogContent({ ...dialogContent, visible: false })
        })
    }

    const capture = async () => {
        if (loading) return;
        let _photo = await camera.current.takePhoto({
            flash: 'auto',
            qualityPrioritization: 'speed',
        });
        dispatch(setLoading({ loading: true }))
        detectText(_photo?.path, (zone, code) => onZoneDetected(zone, code, _photo?.path));
    }

    onZoneDetected = async (zone, code, image) => {
        if (zone && code) {
            let result = await getZoneByChar(zone);
            setZoneData({ zone: result ?? null, zone_code: code })
            dispatch(setLoading({ loading: false }))
            // uploadImage('success', image)
            createParkingContent();
        } else {
            errorToast('Failed To Detect', 'Failed to recognize zone, please enter manually')
            // uploadImage('failed', image)
            dispatch(setLoading({ loading: false }))
        }
    }

    onSupportPress = () => {
        if (loading) return
        setContent(<Support close={() => setContent(null)} />)
    }

    createParkingContent = () => {
        if (loading) return
        setContent(<CreateParking zone={zone.zone} zone_code={zone.zone_code} close={() => closeParkingContent()} createVehicle={() => setContent(<CreateVehicle close={() => createParkingContent()} />)} rating={() => renderRatingContent()} />);
    }

    closeParkingContent = () => {
        setContent(null)
        setZoneData({ zone: null, zone_code: null })
    }

    renderRatingContent = async () => {
        let _result = await readFirstParking();

        if (!_result) {
            try {
                InAppReview.isAvailable();
                InAppReview.RequestInAppReview()
                await setFirstparking();
            } catch (error) {
                console.log(error);
            }
        }
    }

    renderCameraView = () => {
        return (
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={isFocused && !loading}
                photo={true}
                video={false}
                zoom={zoom}
            />
        )
    }

    onZoomIn = () => {
        if (loading) return;
        if (zoom < max_zoom) setZoom(zoom + 1)
    }

    onZoomOut = () => {
        if (loading) return;
        if (zoom > min_zoom) setZoom(zoom - 1)
    }

    return (
        <View style={styles.container}>
            {device ? renderCameraView() : null}
            <HomeActions device={device} camera={() => Linking.openSettings()} capture={() => capture()} profile={() => { if (!loading) navigation.navigate(routes.profile) }} history={() => { if (!loading) navigation.navigate(routes.history) }} vehicles={() => { if (!loading) navigation.navigate(routes.vehicles) }} support={() => onSupportPress()} manual={() => createParkingContent()} zoomIn={() => onZoomIn()} zoomOut={() => onZoomOut()} />
            <ConfirmationDialog content={dialogContent} />
            <BottomUpModal content={content} close={() => closeParkingContent()} />
            {!device ? <View style={styles.camera_error_placeholder}>
                <CameraDeniedIcon width={200} height={200} />
            </View> : null}

        </View>
    );
}


