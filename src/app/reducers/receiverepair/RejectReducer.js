import {ACTION_REJECT_SUCCESS, ACTION_REJECT_FAILED} from '../../Constants';

const initialState = {
  isReject: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTION_REJECT_SUCCESS:
      return {...state, isReject: true};
    case ACTION_REJECT_FAILED:
      return {...state, isReject: false};

    default:
      return state;
  }
};
