import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../slices/usersSlices'
import vouchersReducer from '../slices/voucherSlices'
import reportsReducer from '../slices/reportSlice'
const store = configureStore({
  reducer: {
    users: usersReducer,
    vouchers: vouchersReducer,
    reports: reportsReducer,
  },
});

export default store;