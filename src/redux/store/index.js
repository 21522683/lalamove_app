import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../slices/usersSlices';
import vouchersReducer from '../slices/voucherSlices';
import createOrderReducer from '../slices/createOrderSlice';
import vehicleTypeAdminReducer from '../slices/vehicleTypeAdmin';

const store = configureStore({
  reducer: {
    users: usersReducer,
    createOrder: createOrderReducer,
    vouchers: vouchersReducer,
    vehicleTypeAdmin: vehicleTypeAdminReducer,
  },
});

export default store;
