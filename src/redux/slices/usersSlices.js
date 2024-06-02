import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../../constants/baseUrl';
import { Alert } from 'react-native';
const resetPasswordAction = createAction('password/reset');
//register action
export const registerUserAction = createAsyncThunk(
  'users/registerUser',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //http call
    try {
      const { data } = await axios.post(
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
      console.log(error.response.data.response.message);
      if (payload.setError) {
        payload.setError(error.response.data.response.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);
//register action
export const registerDriverAction = createAsyncThunk(
  'users/registerDriver',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/auth/register-driver`,
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
      console.log(error.response.data.response.message);
      if (payload.setError) {
        payload.setError(error.response.data.response.message);
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);
export const loginUserByGoogleAction = createAsyncThunk(
  'users/loginUserByGoogle',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //http call
    try {
      const { data } = await axios.post(`${baseUrl}/auth/login-by-google`, payload, config);
      await AsyncStorage.setItem('userStorage', JSON.stringify(data));

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
// login
export const loginUserAction = createAsyncThunk(
  'users/loginUser',
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //http call
    try {
      const { data } = await axios.post(`${baseUrl}/auth/login`, user, config);

      await AsyncStorage.setItem('userStorage', JSON.stringify(data));

      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      alert(error.response.data.response.message)
      return rejectWithValue(error?.response?.data);
    }
  },
);
// get all vehicle type
export const getAllVehicleTypeAction = createAsyncThunk(
  'users/getAllVehicleType',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/auth/vehicle-type`, config);
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
// Logout user
export const logoutUserAction = createAsyncThunk(
  'users/logout',
  async (payload, { rejectWithValue, getState, dispatch }) => {
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
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      //http call

      const { data } = await axios.get(
        `${baseUrl}/auth/check-phone?phoneNumber=${payload.pn}`,
        config,
      );

      console.log('call', data);

      if (payload.navigation) {
        payload.navigation.navigate('VerifyEmail', { phoneNumber: payload.pn });
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
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      //http call

      const { data } = await axios.get(
        `${baseUrl}/auth/${payload.pn}/check-otp?otp=${payload.otp}`,
        config,
      );

      console.log('call', data);

      if (payload.navigation) {
        payload.navigation.navigate('Reset-pass', { phoneNumber: payload.pn });
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
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      //http call

      const { data } = await axios.post(
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
export const getCurrentUserAction = createAsyncThunk(
  'users/getCurrentUser',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          'Authorization': `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(`${baseUrl}/users/current-user`, config);
      dispatch(setCurrentUser(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);
export const updatePassUserAction = createAsyncThunk(
  'users/updatePassUser',
  async (dataUpdate, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          'Authorization': `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.put(`${baseUrl}/users/update-pass/${dataUpdate.id}`, dataUpdate.info, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);
export const updateInfoUserAction = createAsyncThunk(
  'users/updateInfoUser',
  async (dataUpdate, { rejectWithValue, getState, dispatch }) => {
    try {
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          'Authorization': `Bearer ${userAuth.access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.put(`${baseUrl}/users/update-info/${dataUpdate.id}`, dataUpdate.info, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  },
);
const usersSlices = createSlice({
  name: 'users',
  initialState: {
    userAuth: {},
    vehicleTypes: [],
    currentUser: {},
    loading: false,
    error: null,
    successMessage: '',

    listAllDriver: [],
    indexSelectedDriver: -1,

  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = {
        ...action.payload
      };
    },
    clearSuccessMessage: (state, action) => {
      state.successMessage = '';
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setListAllDriver: (state, action) => {
      state.listAllDriver = action.payload;
    },
    setIndexSelectedDriver: (state, action) => {
      state.indexSelectedDriver = action.payload;
    }
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
    //login
    builder.addCase(loginUserByGoogleAction.pending, (state, action) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(loginUserByGoogleAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action);
      state.userAuth = action?.payload;
      state.error = undefined;
    });
    builder.addCase(loginUserByGoogleAction.rejected, (state, action) => {
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
    // get all vehicle type 
    builder.addCase(getAllVehicleTypeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.vehicleTypes = action?.payload;
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
    // get current user
    builder.addCase(getCurrentUserAction.pending, (state, action) => {
    });
    builder.addCase(getCurrentUserAction.fulfilled, (state, action) => {
      state.currentUser = action?.payload;
    });
    builder.addCase(getCurrentUserAction.rejected, (state, action) => {
    });
    // get update info user
    builder.addCase(updateInfoUserAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.successMessage = '';
    });
    builder.addCase(updateInfoUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.successMessage = 'Cập nhật thông tin thành công';
    });
    builder.addCase(updateInfoUserAction.rejected, (state, action) => {
      state.loading = false;
    });
    // updatePassUserAction
    builder.addCase(updatePassUserAction.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.successMessage = '';
    });
    builder.addCase(updatePassUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.successMessage = 'Cập nhật mật khẩu thành công';
    });
    builder.addCase(updatePassUserAction.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export default usersSlices.reducer;
export const {
  setCurrentUser,
  clearSuccessMessage,
  setLoading,
  setListAllDriver,
  setIndexSelectedDriver
  
} = usersSlices.actions;
