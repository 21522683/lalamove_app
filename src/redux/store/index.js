import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../slices/usersSlices';
import vouchersReducer from '../slices/voucherSlices';
import createOrderReducer from '../slices/createOrderSlice';
import vehicleTypeAdminReducer from '../slices/vehicleTypeAdmin';
import orderReducer from '../slices/orderSlice';

import reportsReducer from '../slices/reportSlice';
const store = configureStore({
  reducer: {
    users: usersReducer,
    createOrder: createOrderReducer,
    vouchers: vouchersReducer,
    vehicleTypeAdmin: vehicleTypeAdminReducer,
    reports: reportsReducer,
    orders: orderReducer,
  },
});

export default store;
