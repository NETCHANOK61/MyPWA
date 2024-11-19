import { Platform } from 'react-native'
import { request as requestPermissions, checkMultiple, PERMISSIONS, openSettings } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export const requestPermissionsAccept = async () => {
    let cameraStatus, readstorage, writestorage, microphoneStatus = '', readpgonreStatus = '';
    let status = false;
    if (Platform.OS == 'ios') {
        cameraStatus = await requestPermissions(PERMISSIONS.IOS.CAMERA);
        readstorage = await requestPermissions(PERMISSIONS.IOS.PHOTO_LIBRARY);
        microphoneStatus = await requestPermissions(PERMISSIONS.IOS.MICROPHONE);
        if (cameraStatus == 'granted' && readstorage == 'granted' && microphoneStatus == 'granted') {
            status = true;
        } else {
            openSettings().catch(() => console.warn('cannot open settings'));
            status = false;
        }
    } else {
        cameraStatus = await requestPermissions(PERMISSIONS.ANDROID.CAMERA);
        readstorage = await requestPermissions(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        readimage = await requestPermissions(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        readvideo = await requestPermissions(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
        writestorage = await requestPermissions(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        microphoneStatus = await requestPermissions(PERMISSIONS.ANDROID.RECORD_AUDIO);
        if (cameraStatus == 'granted' && readstorage == 'granted' && writestorage == 'granted' && microphoneStatus == 'granted' && readpgonreStatus == 'granted') {
            status = true;
        } else {
            status = false;
        }
    }
    return status;
}

export const checkPermissionsAccept = async () => {
    let cameraStatus, readstorage, writestorage, microphoneStatus = '', readpgonreStatus = '';
    let status = false;
    if (Platform.OS == 'ios') {
        await checkMultiple([
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.MICROPHONE,
        ]).then(async (statuses) => {
            cameraStatus = await statuses[PERMISSIONS.IOS.CAMERA];
            readstorage = await statuses[PERMISSIONS.IOS.PHOTO_LIBRARY];
            microphoneStatus = await statuses[PERMISSIONS.IOS.MICROPHONE];
        });
        console.log(cameraStatus + ',' + ',' + readstorage + ',' + microphoneStatus);
        if (cameraStatus == 'granted' && readstorage == 'granted' && microphoneStatus == 'granted') {
            status = true;
        } else {
            status = false;
        }
    } else {
        await checkMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.RECORD_AUDIO,
        ]).then(async (statuses) => {
            cameraStatus = await statuses[PERMISSIONS.ANDROID.CAMERA];
            readstorage = await statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
            writestorage = await statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];
            microphoneStatus = statuses[PERMISSIONS.ANDROID.RECORD_AUDIO];
        });
        if (cameraStatus == 'granted' &&
            readstorage == 'granted' && writestorage == 'granted' &&
            microphoneStatus == 'granted' && readpgonreStatus == 'granted') {
            status = true;
        } else {
            status = false;
        }
    }
    return status;
}

export const requestLocationAccept = async () => {
    let locationStatus = '';
    let status = false;
    if (Platform.OS == 'ios') {
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
            skipPermissionRequests: false,
            authorizationLevel: 'whenInUse',
        });
        status = true;
    } else {
        locationStatus = await requestPermissions(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (locationStatus == 'granted') {
            status = true;
        } else {
            status = false;
        }
    }
    return status;

}

export const checkLocationAccept = async () => {
    let locationStatus = '';
    let status = false;
    if (Platform.OS == 'ios') {
        await checkMultiple([
            PERMISSIONS.IOS.LOCATION_ALWAYS
        ]).then((statuses) => {
            locationStatus = statuses[PERMISSIONS.IOS.LOCATION_ALWAYS];
        });
        if (locationStatus == 'granted') {
            status = true;
        } else {
            status = false;
        }
    } else {
        await checkMultiple([
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]).then((statuses) => {
            locationStatus = statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
        });
        if (locationStatus == 'granted') {
            status = true;
        } else {
            status = false;
        }
    }
    return status;
}