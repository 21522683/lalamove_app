import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../slices/usersSlices';
import vouchersReducer from '../slices/voucherSlices';
import createOrderReducer from '../slices/createOrderSlice';
import orderReducer from '../slices/orderSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    createOrder: createOrderReducer,
    vouchers: vouchersReducer,
    orders: orderReducer,
  },
});

export default store;
