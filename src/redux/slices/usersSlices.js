import {createAsyncThunk, createSlice, createAction} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../../constants/baseUrl';
const resetPasswordAction = createAction('password/reset');
//register action
export const registerUserAction = createAsyncThunk(
  'users/registerUser',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //http call
    try {
      const {data} = await axios.post(
        `${baseUrl}/auth/register-user`,
        payload.bd,
        config,
      );
      if (payload.setShowDialog) {
        payload.setShowDialog(true);
      }
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
// login
export const loginUserAction = createAsyncThunk(
  'users/loginUser',
  async (user, {rejectWithValue, getState, dispatch}) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //http call
    try {
      const {data} = await axios.post(`${baseUrl}/auth/login`, user, config);

      await AsyncStorage.setItem('userStorage', JSON.stringify(data));

      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);
// Logout user
export const logoutUserAction = createAsyncThunk(
  'users/logout',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      await AsyncStorage.removeItem('userStorage');
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);
// send request reset
export const sendRequestResetAction = createAsyncThunk(
  'users/send-reset-req',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      //http call

      const {data} = await axios.get(
        `${baseUrl}/auth/check-phone?phoneNumber=${payload.pn}`,
        config,
      );

      console.log('call', data);

      if (payload.navigation) {
        payload.navigation.navigate('VerifyEmail', {phoneNumber: payload.pn});
      }
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);

// check otp
export const checkOtpAction = createAsyncThunk(
  'users/check-otp',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      //http call

      const {data} = await axios.get(
        `${baseUrl}/auth/${payload.pn}/check-otp?otp=${payload.otp}`,
        config,
      );

      console.log('call', data);

      if (payload.navigation) {
        payload.navigation.navigate('Reset-pass', {phoneNumber: payload.pn});
      }
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);
// reset password
export const resetPassAction = createAsyncThunk(
  'users/resetPass',
  async (payload, {rejectWithValue, getState, dispatch}) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      //http call

      const {data} = await axios.post(
        `${baseUrl}/auth/reset-password`,
        payload.body,
        config,
      );

      console.log('call', data);
      if (payload.setShowNav) {
        payload.setShowNav(true);
      }

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);
export const setUserAuth = createAction('users/set');

const usersSlices = createSlice({
  name: 'users',
  initialState: {
    userAuth: {},
  },
  extraReducers: builder => {
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action);
      state.userAuth = action?.payload;
      state.error = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    });
    // set user auth
    builder.addCase(setUserAuth, (state, action) => {
      state.userAuth = action?.payload;
    });
    // logout user
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = {};
      state.appErr = undefined;
    });

    //send Request Reset
    builder.addCase(sendRequestResetAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(sendRequestResetAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('ss', action.payload);
      state.error = undefined;
    });
    builder.addCase(sendRequestResetAction.rejected, (state, action) => {
      state.loading = false;
      console.log('rf', action.payload);
      state.error = action?.payload?.response?.message;
    });
    // check otp
    builder.addCase(checkOtpAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(checkOtpAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log('ss', action.payload);
      state.error = undefined;
    });
    builder.addCase(checkOtpAction.rejected, (state, action) => {
      state.loading = false;
      console.log('rf', action.payload);
      state.error = action?.payload?.response?.message;
    });
  },
});
export default usersSlices.reducer;
