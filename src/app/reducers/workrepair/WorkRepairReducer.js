import {
  ACTION_JSON_WORKREPAIR_FETCHING,
  ACTION_JSON_WORKREPAIR_SUCCESS,
  ACTION_JSON_WORKREPAIR_FAILED,
} from '../../Constants';
const initialState = {
  dataArray: [],
  isFetching: false,
  isError: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTION_JSON_WORKREPAIR_FETCHING:
      return {...state, dataArray: [], isFetching: true, isError: false};
    case ACTION_JSON_WORKREPAIR_SUCCESS:
      return {...state, dataArray: payload, isFetching: false, isError: false};
    case ACTION_JSON_WORKREPAIR_FAILED:
      return {...state, dataArray: [], isFetching: false, isError: true};

    default:
      return state;
  }
};
