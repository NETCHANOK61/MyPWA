import React, { Component } from 'react';
import { StatusBar, Platform, ActivityIndicator, Linking, Image, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { Box, View, Text, NativeBaseProvider, Icon, Divider } from 'native-base';
import Modal from 'react-native-modal';
import { StackActions } from '@react-navigation/native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as LoginAction from '../../actions/LoginAction';
import Styles from './styles';
import DeviceInfo from 'react-native-device-info';
import RNExitApp from 'react-native-exit-app';
import { getRememberLogin, setStorage, setRememberLogin, removeRemem, removeStore, getCheckEmployee } from '../../utils/Storage';

export class CheckUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            showModalDialog: false,
            messageLoading: 'กำลังกตรวจอัพเดทเวอร์ชั่น',
        };
        this.onCloseLoading = this.onCloseLoading.bind(this);
        this.onAutoLogin = this.onAutoLogin.bind(this);
    }

    async componentDidMount() {
        this.setState({ isLoaded: false });
        removeStore();
        // Remove CodePush logic here
    }

    renderCheckUpdate = () => {
        return (
            <View style={{ height: '85%', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={'#525F7F'} size={'large'} />
                <View style={Styles.boxVersion}>
                    <Text style={[Styles.textReload, { marginTop: 10 }]}> {'กำลังโหลด'} </Text>
                </View>
            </View>
        );
    };

    render() {
        return (
            <NativeBaseProvider>
                <View style={{ flex: 1 }} >
                    <View style={{ backgroundColor: '#ffffff' }} >
                        <Box safeAreaTop backgroundColor={'#ffffff'} />
                        <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
                        {this.renderCheckUpdate()}
                        <View style={{
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            height: isIphoneX() ? '10%' : Platform.isPad == false ?
                                Platform.OS == 'ios' ? '12%' : '15%' : '14%'
                        }}>
                            <View style={Styles.boxVersion}>
                                <Text style={[Styles.textversion, { color: '#272a2f' }]}> {'Copyright © PWA Field Service (v.1.0.41)'} </Text>
                            </View>
                        </View>
                    </View>
                    <Modal
                        isVisible={this.state.showModalDialog}>
                        <View style={Styles.modalContainer} >
                            <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle='dark-content' />
                            <View style={Styles.innerContainer}>
                                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }} >
                                    <Text style={[Styles.textTitleModal, { color: '#000000' }]} fontSize={'lg'} >{'ข้อความแจ้งเตือน'}</Text>
                                    <Divider borderColor="gray.300" w={'100%'} />
                                    <Icon as={<Ionicons name='warning-outline' />} color={'#ffa530'} size={'3xl'} mt={3} mb={2} />
                                    <Text style={[Styles.textDescModal, { color: '#000000', textAlign: 'center' }]} fontSize={'md'} >
                                        {'เรียนผู้ใช้บริการแอปพลิเคชัน PWA Field Service ขณะนี้มีการปรับปรุงรุ่นเป็นเวอร์ชัน 1.0.28 ทั้งระบบ Android และ iOS ขอให้ผู้ใช้บริการแอปพลิเคชัน PWA Field Service ทำการอัปเดตเพื่อปรับปรุงระบบให้เป็นเวอร์ชันล่าสุด'}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <TouchableOpacity style={Styles.btnClenJob} onPress={() => { this.handelGotoDownloadApp() }}>
                                        <Text style={Styles.textSearch} fontSize={'md'} >{'ตกลง'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Box safeAreaBottom backgroundColor={'#ffffff'} />
                </View>
            </NativeBaseProvider>
        );
    }

    handelGotoDownloadApp() {
        this.setState({ showModalDialog: false });
        try {
            if (Platform.OS == 'ios') {
                Linking.openURL(`https://apps.apple.com/us/app/pwa-field-service/id1526115020`);
            } else {
                Linking.openURL(`https://play.google.com/store/apps/details?id=com.pwa.smart1662.android`);
            }
            setTimeout(() => {
                RNExitApp.exitApp();
            }, 500);
        } catch (error) {
            RNExitApp.exitApp();
        }
    }

    onCloseLoading = async () => {
        this.setState({ isLoaded: false });
        let version = DeviceInfo.getVersion();
        let isemployee = false;
        const remem = await getRememberLogin().then(data => {
            return data;
        });
        const checkEmployee = await getCheckEmployee().then(data => {
            return data;
        });
        isemployee = checkEmployee == '1' ? true : false;
        
        if (Platform.OS == 'ios') {
            if (version == '2.0') {
                if (remem != null) {
                    this.onAutoLogin(remem.username, remem.password, true, isemployee);
                } else {
                    setTimeout(() => {
                        this.props.navigation.dispatch(StackActions.replace('Login'));
                    }, 2000);
                }
            } else {
                this.setState({ showModalDialog: true })
            }
        } else {
            if (version == '1.0.16') {
                if (remem != null) {
                    this.onAutoLogin(remem.username, remem.password, true, isemployee);
                } else {
                    setTimeout(() => {
                        this.props.navigation.dispatch(StackActions.replace('Login'));
                    }, 2000);
                }
            } else {
                this.setState({ showModalDialog: true })
            }
        }
    }

    onAutoLogin = async (username, password, checked, togleCheckEmployee) => {
        try {
            const reqdata = `username=${encodeURIComponent(
                username,
            )}&password=${encodeURIComponent(
                password,
            )}&grant_type=password&isemployee=${togleCheckEmployee == true ? false : true
                }`;
            let res = await LoginAction.autoloaddata(reqdata);
            setStorage(JSON.stringify(this.setStore(res.data)));
            if (checked) {
                setRememberLogin(
                    JSON.stringify({
                        username: username,
                        password: password,
                        isemployee: togleCheckEmployee,
                    }),
                );
            } else {
                removeRemem();
            }
            if (res.data.user_active == "false") {
                removeRemem();
                this.props.navigation.dispatch(StackActions.replace('Login'));
            } else if (res.data.user_expire == "true") {
                removeRemem();
                this.props.navigation.dispatch(StackActions.replace('Login'));
            } else {
                this.props.navigation.dispatch(StackActions.replace('Success'));
            }
        } catch (error) {
            if (error.response.status == 400) {
                setTimeout(() => {
                    this.props.navigation.dispatch(StackActions.replace('Login'));
                }, 500);
            } else {
                Alert.alert(
                    'ข้อความแจ้งเตือน!',
                    'ไม่สามารถเข้าใช้งานระบบได้ เนื่องจากไม่สามารถติดต่อผู้ให้บริการได้ขณะนี้ โปรดลองใหม่ภายหลัง',
                    [
                        {
                            text: 'ตกลง',
                        },
                    ],
                    { cancelable: false },
                );
            }
        }
    }
}

export default CheckUpdate;
