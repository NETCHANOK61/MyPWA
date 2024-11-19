import {ACTION_WORKSURVEY_TARGET_IMAGE} from '../../Constants';
const initialState = {
  target: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ACTION_WORKSURVEY_TARGET_IMAGE:
      return {...state, target: payload};

    default:
      return state;
  }
};
