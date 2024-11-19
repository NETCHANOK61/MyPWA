import axios from 'axios';
import {
  ACTION_GETREPAIRWORKBYID_SUCCESS,
  ACTION_GETREPAIRWORKBYID_FAILED,
} from '../../Constants';
import url from '../UrlAction';
import {getToken} from '../../utils/Storage';
import {checkedToken} from '../../utils/Service';

export const setStateGetRepairWorkByIdSuccess = payload => ({
  type: ACTION_GETREPAIRWORKBYID_SUCCESS,
  payload,
});

export const setStateGetRepairWorkByIdFailed = () => ({
  type: ACTION_GETREPAIRWORKBYID_FAILED,
});

export const savePhoto = (props, file, settingAlert) => {
  return async dispatch => {
    try {
      const req = {
        RWId: props.route.params.rwId,
        RWCode: props.route.params.rwCode,
        Files: [...file],
      };
      //console.log('SAVE IMAGE =======> : ', req);

      await service('POST', req, url.updateRepairWorkProcessFile)
        .then(async res => {
          settingAlert('ALERT_INSERT_SUCCESS');
          //console.log('updateRepairWorkProcessFile : ', res);
        })
        .catch(error => {
          console.log(error);
          if (error.response.status == 404) {
            settingAlert('ALERT_INSERT_FAILED');
            setTimeout(() => {
              checkedToken(error, props);
            }, 1000);
          } else {
            settingAlert('ALERT_INSERT_FAILED');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadDataGetRepairWorkByID = (props, settingAlert) => {
  return async dispatch => {
    await callServive(url.GetRepairWorkByID + '/' + props.route.params.rwId)
      .then(async res => {
        dispatch(setStateGetRepairWorkByIdSuccess(res));
        settingAlert('ALERT_LOAD_REPAIR_WORK');
        //props.navigation.goBack();
      })
      .catch(error => {
        if (error.response.status == 404) {
          setTimeout(() => {
            checkedToken(error, props);
          }, 1000);
        }
        console.log(error);
        dispatch(setStateGetRepairWorkByIdFailed());
      });
  };
};

const service = async (_act, req, _url) => {
  const token = await getToken().then(data => {
    return data;
  });

  return new Promise((resolve, reject) => {
    axios({
      method: _act,
      url: _url,
      headers: {
        Authorization: `Bearer ${token}`,
        responseType: 'json',
      },
      data: req,
    })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
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
