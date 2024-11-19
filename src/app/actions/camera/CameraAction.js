import {ACTION_PHOTO, ACTION_PHOTO_RESET} from '../../Constants';

export const setStatePhoto = (payload, imageseq, imagetype, comment) => ({
  type: ACTION_PHOTO,
  payload,
  imageseq,
  imagetype,
  comment,
});

export const setStatePhotoReset = () => ({
  type: ACTION_PHOTO_RESET,
});

export const setPhoto = (base64, imageseq, imagetype, comment) => {
  return dispath => {
    dispath(setStatePhoto(base64, imageseq, imagetype, comment));
  };
};

export const setPhotoReset = () => {
  return dispath => {
    dispath(setStatePhotoReset());
  };
};
