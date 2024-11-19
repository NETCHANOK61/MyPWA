import {
  ACTION_PROFILE_TARGET,
  ACTION_GET_NUM_OF_WORK_SUCCESS,
  ACTION_GET_NUM_OF_WORK_FAILED,
} from '../../Constants';
const initialState = {
  dataObject: null,
  isError: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTION_PROFILE_TARGET:
      return {...state};
    case ACTION_GET_NUM_OF_WORK_SUCCESS:
      return {...state, dataObject: payload, isError: false};
    case ACTION_GET_NUM_OF_WORK_FAILED:
      return {...state, dataObject: null, isError: true};
    default:
      return state;
  }
};
