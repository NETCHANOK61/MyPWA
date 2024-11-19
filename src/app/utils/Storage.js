import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async _obj => {
  await AsyncStorage.setItem('profile', JSON.stringify(JSON.parse(_obj)));
};

export const getToken = () => {
  return new Promise(async resolve => {
    const _t = await AsyncStorage.getItem('profile');
    const token = JSON.parse(_t);
    resolve(token.token);
  });
};

export const getProfile = () => {
  return new Promise(async resolve => {
    const _t = await AsyncStorage.getItem('profile');
    const _json = JSON.parse(_t);
    resolve(_json);
  });
};

export const removeStore = async () => {
  await AsyncStorage.removeItem('profile');
};

export const setRememberLogin = async _obj => {
  await AsyncStorage.setItem('remem', JSON.stringify(JSON.parse(_obj)));
};

export const getRememberLogin = async () => {
  return new Promise(async resolve => {
    const _t = await AsyncStorage.getItem('remem');
    const remem = JSON.parse(_t);
    resolve(remem);
  });
};

export const removeRemem = async () => {
  await AsyncStorage.removeItem('remem');
};

export const setLocationSave = async _obj => {
  await AsyncStorage.setItem('locat', JSON.stringify(JSON.parse(_obj)));
};

export const getLocationSave = () => {
  return new Promise(async resolve => {
    const _t = await AsyncStorage.getItem('locat');

    const locat = JSON.parse(_t);
    resolve(locat);
  });
};
export const removeLocationSave = async () => {
  await AsyncStorage.removeItem('location');
};

export const setMapSnapValue = async (valueMapSnap) => {
  await AsyncStorage.setItem('mapsnap', valueMapSnap);
};

export const getValueMapSnap = () => {
  return new Promise(async resolve => {
    const _t = await AsyncStorage.getItem('mapsnap');
    const locat = JSON.parse(_t);
    resolve(locat);
  });
};

export const removeValueMapSnap = async () => {
  await AsyncStorage.removeItem('mapsnap');
};

export const setCheckEmployee = async (isEmployee) => {
  await AsyncStorage.setItem('employee', isEmployee);
};

export const getCheckEmployee = async () => {
  return new Promise(async resolve => {
    const _t = await AsyncStorage.getItem('employee');
    const remem = JSON.parse(_t);
    resolve(remem);
  });
};

export const removeCheckEmployee = async () => {
  await AsyncStorage.removeItem('employee');
};
