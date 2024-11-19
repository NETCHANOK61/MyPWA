import {ACTION_MAIN_TAB_TARGET} from '../../Constants';
export const setStateTarget = payload => ({
  type: ACTION_MAIN_TAB_TARGET,
  payload,
});

export const tarGet = navigation => {
  return dispatch => {
    navigation.navigate('Success');
  };
};
