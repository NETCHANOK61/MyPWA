import {
  ACTION_UPDATE_REPAIR_WORK_SUCCESS,
  ACTION_UPDATE_REPAIR_WORK_FAILED,
} from '../../Constants';
const initialState = {
  dataObj: {},
  isError: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTION_UPDATE_REPAIR_WORK_SUCCESS:
      return {...state, dataObj: payload, isError: 'YES'};
    case ACTION_UPDATE_REPAIR_WORK_FAILED:
      return {...state, dataObj: null, isError: 'NO'};

    default:
      return state;
  }
};
