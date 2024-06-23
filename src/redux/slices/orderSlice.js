import {createAsyncThunk, createSlice, isPlainObject} from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../../constants/baseUrl';

// get all user orders slice

export const getAllUserOrdersAction = createAsyncThunk(
  'orders/getAllUserOrdersAction',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    const user = getState()?.users;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.userAuth?.access_token}`,
      },
    };

    try {
      console.log('doo');

      const {data} = await axios.get(
        `${baseUrl}/order/${user?.userAuth?.id}/get-user-orders`,
        config,
      );
      console.log(data);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

export const getAllOrderInRadius = createAsyncThunk(
  'orders/getAllOrderInRadius',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    const user = getState()?.users;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.userAuth?.access_token}`,
      },
    };

    try {
      const searchString = createSearchString(payload.query);
      const {data} = await axios.get(
        `${baseUrl}/order/driver-orders?${searchString}`,
        config,
      );

      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

function createSearchString(paramsObj) {
  const params = new URLSearchParams();

  for (const key in paramsObj) {
    if (paramsObj.hasOwnProperty(key)) {
      params.append(key, paramsObj[key]);
    }
  }

  return params.toString();
}

const OrdersSlices = createSlice({
  name: 'orders',
  initialState: {
    pendingOrders: [],
    userOrders: [],
  },
  extraReducers: builder => {
    //get all pending orders
    // builder.addCase(getAllPendingOrdersAction.pending, (state, action) => {
    //   state.loading = true;
    //   state.error = undefined;
    // });
    // builder.addCase(getAllPendingOrdersAction.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.pendingOrders = action?.payload?.data;
    //   state.error = undefined;
    // });
    // builder.addCase(getAllPendingOrdersAction.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action?.payload?.response?.message;
    // });
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

    builder.addCase(getAllOrderInRadius.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getAllOrderInRadius.fulfilled, (state, action) => {
      state.loading = false;
      state.ordersInRadius = action?.payload?.data;
      state.error = undefined;
    });
    builder.addCase(getAllOrderInRadius.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.response?.message;
    });
  },
});
export default OrdersSlices.reducer;
