import axios from "axios";
import {
  ACTION_GETREPAIRWORKBYID_SUCCESS,
  ACTION_GETREPAIRWORKBYID_FAILED,
  ACTION_TITLE_NO,
  ACTION_RADIO_PIPE,
} from "../../Constants";
import url from "../UrlAction";
import { getToken } from "../../utils/Storage";
import { checkedToken } from "../../utils/Service";

export const setStateGetRepairWorkByIdSuccess = (payload) => ({
  type: ACTION_GETREPAIRWORKBYID_SUCCESS,
  payload,
});

export const setStateGetRepairWorkByIdFailed = () => ({
  type: ACTION_GETREPAIRWORKBYID_FAILED,
});

export const setStateNo = () => ({
  type: ACTION_TITLE_NO,
});

export const setStateRadioPipe = (payload) => ({
  type: ACTION_RADIO_PIPE,
  payload,
});

export const loadGetRepairWorkById = (payload, props, callback) => {
  return async (dispatch) => {
    try {
      const req = payload;
      await loaddata(req)
        .then(async (res) => {
          callback(false);
          dispatch(setStateGetRepairWorkByIdSuccess(res.data));
          props.navigation.navigate("WorkRepair", {
            screen: "workrepairtabscreen",
            rwcode: res.data.rwCode,
            page: "2",
          });
          // props.navigation.navigate('workrepairtabscreen', {
          //   rwcode: res.data.rwCode,
          //   page: '2',
          // });
        })
        .catch((error) => {
          dispatch(setStateGetRepairWorkByIdFailed());
          checkedToken(error, props);
        });
    } catch (error) {
      dispatch(setStateGetRepairWorkByIdFailed());
    }
  };
};

const loaddata = async (req) => {
  const token = await getToken().then((data) => {
    return data;
  });

  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `${url.GetRepairWorkByID}/${req}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
