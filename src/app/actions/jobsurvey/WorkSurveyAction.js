import {
  ACTION_WORKSURVEY_TARGET_IMAGE,
  ACTION_GETREPAIRWORKBYID_SUCCESS,
  ACTION_GETREPAIRWORKBYID_FAILED,
} from '../../Constants';

import url from '../UrlAction';
import {getToken} from '../../utils/Storage';

export const setStateWorkSurveyTargetImage = payload => ({
  type: ACTION_WORKSURVEY_TARGET_IMAGE,
  payload,
});

export const setStateGetRepairWorkByIdSuccess = payload => ({
  type: ACTION_GETREPAIRWORKBYID_SUCCESS,
  payload,
});

export const setStateGetRepairWorkByIdFailed = () => ({
  type: ACTION_GETREPAIRWORKBYID_FAILED,
});

export const workSurveyTargetImage = target => {
  return dispatch => {
    dispatch(setStateWorkSurveyTargetImage(target));
  };
};

export const getRepairWorkByID = rwId => {
  return async dispatch => {
    try {
      await callServive(url.GetRepairWorkByID + '/' + rwId)
        .then(async res => {
          //console.log(res);
          dispatch(setStateGetRepairWorkByIdSuccess(res));
        })
        .catch(error => {
          console.log(error);
          dispatch(setStateGetRepairWorkByIdFailed());
        });
    } catch (error) {
      console.log(error);
    }
  };
};

const callServive = async _url => {
  const token = await getToken().then(data => {
    return data;
  });
  return new Promise((resolve, reject) => {
    fetch(`${_url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      resolve(res.json());
    });
  });
};
