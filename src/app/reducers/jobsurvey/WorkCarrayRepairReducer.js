import {
  ACTION_LIST_PIKCER,
  ACTION_GET_SIZE_OF_PIPES,
  ACTION_GET_REQUEST_CATEGORY,
  ACTION_UPDATE_REPAIRWORK_PROCESS,
  ACTION_UPDATE_REPAIRWORK_CLOSEJOB,
  ACTION_REMEM_WORKCARRYREPAIR,
} from '../../Constants';

const initialState = {
  dataObject: null,
  dataGetSizeOfPipes: null,
  dataRequestCategory: null,
  resultUpdateRepairWorkProcess: null,
  resultUpdateRepairWorkCloseJob: null,
  rememViewWorkCarray: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_LIST_PIKCER:
      return { ...state, dataObject: payload };

    case ACTION_GET_SIZE_OF_PIPES:
      return { ...state, dataGetSizeOfPipes: payload };

    case ACTION_GET_REQUEST_CATEGORY:
      return { ...state, dataRequestCategory: payload };

    case ACTION_UPDATE_REPAIRWORK_PROCESS:
      return { ...state, resultUpdateRepairWorkProcess: payload };

    case ACTION_UPDATE_REPAIRWORK_CLOSEJOB:
      return { ...state, resultUpdateRepairWorkCloseJob: payload };

    case ACTION_REMEM_WORKCARRYREPAIR:
      return { ...state, rememViewWorkCarray: payload };

    default:
      return state;
  }
};
