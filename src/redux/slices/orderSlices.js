import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../../constants/baseUrl';

//update order status Action
export const updateOrderStatusAction = createAsyncThunk(
  'orders/updateOrderStatus',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bearer ${user?.userAuth?.access_token},
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        ${baseUrl}/order/update-status-order,
        { ...payload.body, driverId: user?.userAuth?.id, },
        config,
      );
      if (payload.isSuccess) {
        payload.isSuccess();
        dispatch(getAllPendingOrdersAction());
        dispatch(getAllUserOrdersAction());
      }
      console.log(data);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      console.log(error.response.data.response.message);
      return rejectWithValue(error?.response?.data);
    }
  },
);

// get all Pending Orders (Driver module)
export const getAllPendingOrdersAction = createAsyncThunk(
  'orders/getAllPendingOrders',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bearer ${user?.userAuth?.access_token},
      },
    };
    //http call
    try {
      const { data } = await axios.get(${baseUrl}/order, config);
      console.log(data)
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);
// get all User Orders (Driver, User Module)
export const getAllUserOrdersAction = createAsyncThunk(
  'orders/getAllUserOrders',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bearer ${user?.userAuth?.access_token},
      },
    };
    //http call
    try {
      const { data } = await axios.get(${baseUrl}/order/${user?.userAuth?.id}/get-user-orders, config);
      console.log(data)
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);
const OrdersSlices = createSlice({
  name: 'orders',
  initialState: {
    pendingOrders: [],
    userOrders: [],
  },
  extraReducers: builder => {
    //get all pending orders 
    builder.addCase(getAllPendingOrdersAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getAllPendingOrdersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingOrders = action?.payload?.data;
      state.error = undefined;
    });
    builder.addCase(getAllPendingOrdersAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.response?.message;
    });
    //get all user orders 
    builder.addCase(getAllUserOrdersAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getAllUserOrdersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userOrders = action?.payload?.data;
      state.error = undefined;
    });
    builder.addCase(getAllUserOrdersAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.response?.message;
    });
  },
});
export default OrdersSlices.reducer;