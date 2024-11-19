import axios from 'axios';
import {
  ACTION_GET_INCIDENT_SEARCH_SUCCESS,
  ACTION_GET_INCIDENT_SEARCH_FAILED,
} from '../../Constants';
import url from '../UrlAction';
import {getToken} from '../../utils/Storage';

export const setStateIncidentSearchSuccess = payload => ({
  type: ACTION_GET_INCIDENT_SEARCH_SUCCESS,
  payload,
});

export const setStateIncidentSearchFailed = () => ({
  type: ACTION_GET_INCIDENT_SEARCH_FAILED,
});

export const inncidentSearch = navigation => {
  return async dispatch => {
    try {
      // await serviveFetch('GET', url.getIncidentSearchCriteria)
      //   .then(data => {
      //     dispatch(setStateIncidentSearchSuccess(data));
      navigation.navigate('RepairFilterScreen');
      // })
      // .catch(error => {
      //   dispatch(setStateIncidentSearchFailed());
      // });
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
