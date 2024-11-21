// // store.js
// import { configureStore } from '@reduxjs/toolkit';
// // import rootReducer from '../reducers/reducers';
// import rootReducer from '../reducers/index';
// import thunk from 'redux-thunk';

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });

// export default store;

import { configureStore, createSlice } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index';

// สร้าง slice สำหรับ counter
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    INCREMENT: (state) => state + 1,
    DECREMENT: (state) => state - 1,
  },
});

// Export actions
export const { INCREMENT, DECREMENT } = counterSlice.actions;

// สร้าง store
const store = configureStore({
  reducer: rootReducer
});

export default store;