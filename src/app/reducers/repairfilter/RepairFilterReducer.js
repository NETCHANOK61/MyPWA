import {
  ACTION_GET_INCIDENT_SEARCH_SUCCESS,
  ACTION_GET_INCIDENT_SEARCH_FAILED,
} from '../../Constants';

const initialState = {
  dataObject: null,
  isError: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTION_GET_INCIDENT_SEARCH_SUCCESS:
      return {...state, dataObject: payload, isError: false};

    case ACTION_GET_INCIDENT_SEARCH_FAILED:
      return {...state, dataObject: null, isError: true};

    default:
      return state;
  }
};
