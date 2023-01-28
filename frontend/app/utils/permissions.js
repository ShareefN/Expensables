import { Camera } from 'react-native-vision-camera';
import { PermissionsAndroid, Platform } from 'react-native';

export const permission = async (askPermission) => {
    const cameraPermission = await Camera.getCameraPermissionStatus()

    if (cameraPermission === 'authorized') return;

    if (cameraPermission === 'not-determined') {
        const newCameraPermission = await Camera.requestCameraPermission();

        if (newCameraPermission === 'authorized') return;

        if (newCameraPermission === 'denied') {
            if (Platform.OS === 'android') {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA)
            } else return askPermission()
        }

        if (newCameraPermission === 'restricted') {
            if (Platform.OS === 'android') {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA)
            } else return askPermission()
        }
    }

    if (cameraPermission === 'denied') {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA)
        } else return askPermission()
    }

    if (cameraPermission === 'restricted') {
        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA)
        } else return askPermission()
    }
}

