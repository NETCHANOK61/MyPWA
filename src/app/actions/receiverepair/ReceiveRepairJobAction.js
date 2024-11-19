import {
  ACTION_RECIVER_JOB_SELECT,
  ACTION_RECIVER_JOB_SUCCESS,
  ACTION_RECIVER_JOB_FAILED,
} from '../../Constants';
import url from '../UrlAction';
import axios from 'axios';
import {Alert} from 'react-native';
import {getToken} from '../../utils/Storage';

export const setStateReceiveRepairJobSelect = payload => ({
  type: ACTION_RECIVER_JOB_SELECT,
  payload,
});

export const setStateReceiveRepairJobSuccess = payload => ({
  type: ACTION_RECIVER_JOB_SUCCESS,
  payload,
});

export const setStateReceiveRepairJObFailed = () => ({
  type: ACTION_RECIVER_JOB_FAILED,
});

export const setReceiveRepairJobSelect = payload => {
  return dispatch => {
    dispatch(setStateReceiveRepairJobSelect(payload));
  };
};

export const setReceiveRepairJobSuccess = payload => {
  return async dispatch => {
    try {
      const req = payload;
      await callApi(req)
        .then(async res => {
          dispatch(setStateToSuccess(res.data.result));
        })
        .catch(error => {
          console.log(error);
          dispatch(setStateReceiveRepairJObFailed());
        });
    } catch (error) {
      dispatch(setStateReceiveRepairJObFailed());
    }
  };
};

const callApi = async req => {
  const token = await getToken().then(data => {
    return data;
  });
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${url.reciverJob}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(req),
    })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
