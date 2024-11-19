import axios from 'axios';
import {
  ACTION_PROFILE_TARGET,
  ACTION_GET_NUM_OF_WORK_SUCCESS,
  ACTION_GET_NUM_OF_WORK_FAILED,
} from '../../Constants';
import url from '../UrlAction';
import {getToken} from '../../utils/Storage';

export const setStateProfileTarget = () => ({
  type: ACTION_PROFILE_TARGET,
});


export const setStateGetNumOfWorkSuccess = payload => ({
  type: ACTION_GET_NUM_OF_WORK_SUCCESS,
  payload,
});

export const setStateGetNumOfWorkFailed = payload => ({
  type: ACTION_GET_NUM_OF_WORK_FAILED,
});

export const setProfileTarget = (target, props) => {
  return async dispatch => {
    dispatch(setProfileTarget());

    props.navigation.navigate('Success');
    // setTimeout(() => {
    if (target == 1) {
      props.navigation.jumpTo('ReceiveRepair', {
        owner: 'ReceiveRepair',
      });
    } else if (target == 2) {
      props.navigation.jumpTo('WorkRepair', {
        owner: 'WorkRepair',
      });
    }
    // }, 500);
  };
};

export const getNumOfWork = () => {
  return async dispatch => {
    try {
      const req = {};
      await serviveFetch('GET', url.getNumOfWork)
        .then(data => {
          dispatch(setStateGetNumOfWorkSuccess(data));
        })
        .catch(error => {
          console.log(error);
          dispatch(setStateGetNumOfWorkFailed());
        });
    } catch (error) {
      console.error(error);
    }
  };
};

const serviveFetch = async (_act, _url) => {
  const token = await getToken().then(data => {
    return data;
  });
  return new Promise((resolve, reject) => {
    fetch(_url, {
      method: _act,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        resolve(res.json());
      })
      .catch(error => {
        reject(error);
      });
  });
};
