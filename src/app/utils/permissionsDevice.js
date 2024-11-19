import { Platform } from 'react-native';
import * as Permissions from 'expo-permissions';  // Use Expo permissions for general permissions
import * as Location from 'expo-location';  // Use Expo location for location permissions

export const requestPermissionsAccept = async () => {
    let cameraStatus, readstorage, writestorage, microphoneStatus = '', readimage = '';
    let status = false;
    if (Platform.OS === 'ios') {
        const { status: cameraStatusResult } = await Permissions.askAsync(Permissions.CAMERA);
        const { status: readstorageResult } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        const { status: microphoneStatusResult } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        
        if (cameraStatusResult === 'granted' && readstorageResult === 'granted' && microphoneStatusResult === 'granted') {
            status = true;
        } else {
            status = false;
        }
    } else {
        const { status: cameraStatusResult } = await Permissions.askAsync(Permissions.CAMERA);
        const { status: readstorageResult } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const { status: readimageResult } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        const { status: writestorageResult } = await Permissions.askAsync(Permissions.SYSTEM_BRIGHTNESS);
        const { status: microphoneStatusResult } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        
        if (cameraStatusResult === 'granted' && readstorageResult === 'granted' && writestorageResult === 'granted' && microphoneStatusResult === 'granted' && readimageResult === 'granted') {
            status = true;
        } else {
            status = false;
        }
    }
    return status;
};

export const checkPermissionsAccept = async () => {
    let cameraStatus, readstorage, writestorage, microphoneStatus = '', readimage = '';
    let status = false;
    if (Platform.OS === 'ios') {
        const { status: cameraStatusResult } = await Permissions.getAsync(Permissions.CAMERA);
        const { status: readstorageResult } = await Permissions.getAsync(Permissions.MEDIA_LIBRARY);
        const { status: microphoneStatusResult } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);

        if (cameraStatusResult === 'granted' && readstorageResult === 'granted' && microphoneStatusResult === 'granted') {
            status = true;
        } else {
            status = false;
        }
    } else {
        const { status: cameraStatusResult } = await Permissions.getAsync(Permissions.CAMERA);
        const { status: readstorageResult } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        const { status: readimageResult } = await Permissions.getAsync(Permissions.MEDIA_LIBRARY);
        const { status: writestorageResult } = await Permissions.getAsync(Permissions.SYSTEM_BRIGHTNESS);
        const { status: microphoneStatusResult } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
        
        if (cameraStatusResult === 'granted' && readstorageResult === 'granted' && writestorageResult === 'granted' && microphoneStatusResult === 'granted' && readimageResult === 'granted') {
            status = true;
        } else {
            status = false;
        }
    }
    return status;
};

export const requestLocationAccept = async () => {
    let locationStatus = '';
    let status = false;
    if (Platform.OS === 'ios') {
        // Use expo-location for iOS location permissions
        const { status: locationPermissionStatus } = await Location.requestForegroundPermissionsAsync();
        locationStatus = locationPermissionStatus;
        if (locationStatus === 'granted') {
            status = true;
        }
    } else {
        const { status: locationStatusResult } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
        if (locationStatusResult === 'granted') {
            status = true;
        } else {
            status = false;
        }
    }
    return status;
};

export const checkLocationAccept = async () => {
    let locationStatus = '';
    let status = false;
    if (Platform.OS === 'ios') {
        const { status: locationStatusResult } = await Location.requestForegroundPermissionsAsync();
        if (locationStatusResult === 'granted') {
            status = true;
        } else {
            status = false;
        }
    } else {
        const { status: locationStatusResult } = await Permissions.getAsync(Permissions.LOCATION_FOREGROUND);
        if (locationStatusResult === 'granted') {
            status = true;
        } else {
            status = false;
        }
    }
    return status;
};
