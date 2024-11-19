// redux/store.js
import { configureStore } from '@reduxjs/toolkit';

// ตัวอย่าง Reducer
const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// สร้าง store
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
