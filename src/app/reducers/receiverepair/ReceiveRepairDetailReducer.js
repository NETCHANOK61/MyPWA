import {
  ACTION_RECEIVEREPAIR_DETAIL_SUCCESS,
  ACTION_RECEIVEREPAIR_DETAIL_FAILED,
  ACTION_RECEIVEREPAIR_CREATE_REPAIR_WORK_SUCCESS,
  ACTION_RECEIVEREPAIR_CREATE_REPAIR_WORK_FAILED,
  ACTION_GET_INCIDENT_REJECT_TYPE_SUCCESS,
  ACTION_GET_INCIDENT_REJECT_TYPE_FAILED,
} from '../../Constants';

const initialState = {
  dataArray: [],
  dataObj: {},
  dataArrayTypeReject: [],
  isError: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTION_RECEIVEREPAIR_DETAIL_SUCCESS:
      return {...state, dataArray: payload, isError: false};

    case ACTION_RECEIVEREPAIR_DETAIL_FAILED:
      return {...state, dataArray: [], isError: true};

    case ACTION_RECEIVEREPAIR_CREATE_REPAIR_WORK_SUCCESS:
      return {...state, dataObj: payload, isError: false};

    case ACTION_RECEIVEREPAIR_CREATE_REPAIR_WORK_FAILED:
      return {...state, dataObj: {}, isError: true};

    case ACTION_GET_INCIDENT_REJECT_TYPE_SUCCESS:
      return {...state, dataArrayTypeReject: payload, isError: false};

    case ACTION_GET_INCIDENT_REJECT_TYPE_FAILED:
      return {...state, dataArrayTypeReject: [], isError: true};

    default:
      return state;
  }
};
