import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../slices/usersSlices'
import vouchersReducer from '../slices/voucherSlices'
const store = configureStore({
  reducer: {
    users: usersReducer,
    vouchers: vouchersReducer,

  },
});

export default store;