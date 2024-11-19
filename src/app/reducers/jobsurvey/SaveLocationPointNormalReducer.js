import {
  ACTION_SAVE_LOCATION_POINT_NORMAL_SUCCESS,
  ACTION_SAVE_LOCATION_POINT_NORMAL_FAILED,
} from '../../Constants';

const initialState = {
  dataObj: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_SAVE_LOCATION_POINT_NORMAL_SUCCESS:
      return { ...state, dataObj: payload };
    case ACTION_SAVE_LOCATION_POINT_NORMAL_FAILED:
      return { ...state, dataObj: null };
    default:
      return state;
  }
};
