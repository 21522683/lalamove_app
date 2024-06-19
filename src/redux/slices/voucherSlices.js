import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../../constants/baseUrl';

//update Voucher Action
export const updateVoucherAction = createAsyncThunk(
  'vouchers/updateVoucher',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.userAuth?.access_token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/vouchers/${payload?.voucherId}/update-voucher`,
        {...payload.bd},
        config,
      );
      if (payload.navigation) {
        dispatch(getAllVouchersAction());
        payload.navigation.goBack();
      }
      console.log(data);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      console.log(error.response.data.response.message);
      alert(error.response.data.response.message)

      return rejectWithValue(error?.response?.data);
    }
  },
);
//add voucher
export const addVoucherAction = createAsyncThunk(
  'vouchers/addVoucher',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.userAuth?.access_token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/vouchers/add-voucher`,
        {...payload.bd},
        config,
      );
      if (payload.navigation) {
        dispatch(getAllVouchersAction());
        payload.navigation.goBack();
      }
      console.log(data);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      console.log(error.response.data.response.message);
      alert(error.response.data.response.message)

      return rejectWithValue(error?.response?.data);
    }
  },
);
// get all vouchers
export const getAllVouchersAction = createAsyncThunk(
  'vouchers/getAllVouchers',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.userAuth?.access_token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/vouchers`, config);
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
const vouchersSlices = createSlice({
  name: 'vouchers',
  initialState: {
    vouchers: []
  },
  extraReducers: builder => {
    
    //get user infor
    builder.addCase(getAllVouchersAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getAllVouchersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.vouchers = action?.payload;
      state.error = undefined;
    });
    builder.addCase(getAllVouchersAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.response?.message;
    });
  },
});
export default vouchersSlices.reducer;
