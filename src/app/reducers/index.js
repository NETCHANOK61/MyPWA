import { combineReducers } from "redux";
import loginReducer from "./LoginReducer";
import receiveRepairReducer from "./receiverepair/ReceiveRepairReducer";
import receiveRepairDetailReducer from "./receiverepair/ReceiveRepairDetailReducer";
import receiveRepairJobReducer from "./receiverepair/ReceiveRepairJobReducer";
import workRepairReducer from "./workrepair/WorkRepairReducer";
import workRepairDetailReducer from "./workrepair/WorkRepairDetailReducer";
import profileReducer from "./profile/ProfileReducer";
import cameraReducer from "./camera/CameraReducer";
import workTakePhotoReducer from "./jobsurvey/WorkTakePhotoReducer";
import workSurveyReducer from "./jobsurvey/WorkSurveyReducer";
import repairFilterReducer from "./repairfilter/RepairFilterReducer";
import rejectReducer from "./receiverepair/RejectReducer";
import workCarrayRepairReducer from "./jobsurvey/WorkCarrayRepairReducer";
import saveLocationPointNormalReducer from "./jobsurvey/SaveLocationPointNormalReducer";
import Counter from "./counter";

export default combineReducers({
  counter: Counter,
  loginReducer,
  receiveRepairReducer,
  receiveRepairDetailReducer,
  receiveRepairJobReducer,
  workRepairReducer,
  workRepairDetailReducer,
  profileReducer,
  cameraReducer,
  workTakePhotoReducer,
  workSurveyReducer,
  repairFilterReducer,
  rejectReducer,
  workCarrayRepairReducer,
  saveLocationPointNormalReducer,
});
