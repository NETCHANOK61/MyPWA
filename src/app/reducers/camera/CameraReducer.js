import {ACTION_PHOTO, ACTION_PHOTO_RESET} from '../../Constants';
const initialState = {
  phototype: '',
  photoseq: 0,
  base64: '',
  comment: null,
};

export default (
  state = initialState,
  {type, payload, imageseq, imagetype, comment},
) => {
  switch (type) {
    case ACTION_PHOTO:
      return {
        ...state,
        base64: payload,
        photoseq: imageseq,
        phototype: imagetype,
        comment: comment,
      };

    case ACTION_PHOTO_RESET:
      return {
        ...state,
        base64: '',
        photoseq: 0,
        phototype: '',
        comment: null,
      };

    default:
      return state;
  }
};
