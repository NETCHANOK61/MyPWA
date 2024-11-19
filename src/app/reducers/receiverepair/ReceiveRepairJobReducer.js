import {
  ACTION_RECIVER_JOB_SELECT,
  ACTION_RECIVER_JOB_FAILED,
  ACTION_RECIVER_JOB_SUCCESS,
} from '../../Constants';
const initialState = {
  dataArray: [],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTION_RECIVER_JOB_SELECT:
      return {...state, dataArray: payload};

    case ACTION_RECIVER_JOB_SUCCESS:
      return {...state, dataArray: payload};

    case ACTION_RECIVER_JOB_FAILED:
      return {...state, dataArray: []};

    default:
      return state;
  }
};
