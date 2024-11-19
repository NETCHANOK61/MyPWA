// src/reducers/reducers.js
import { combineReducers } from 'redux';

// ตัวอย่าง reducer
const myDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  myData: myDataReducer,  // รวม reducer ของคุณที่นี่
});

export default rootReducer;
