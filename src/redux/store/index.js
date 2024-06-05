import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../slices/usersSlices';
import createOrderReducer from '../slices/createOrderSlice';
const store = configureStore({
  reducer: {
    users: usersReducer,
    createOrder: createOrderReducer,
  },
});

export default store;
