import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  shortDescription: '',
  sourceAddress: {},
  destinationAddress: {},
  goodsImage: null,
  vehicleType: {},
  status: 'Đang chờ nhận',
  charge: 0,
  goodsType: '',
  note: '',
  statusChooseAddress: '',
  discountPrice: 0,
  newAddress: {},
};

const createOrderSlice = createSlice({
  initialState: initialState,
  name: 'createOrderSlice',
  reducers: {
    setSourceAddress: (state, action) => {
      state.sourceAddress = action.payload;
    },
    setDestinationAddress: (state, action) => {
      state.destinationAddress = action.payload;
    },
    setStatusChooseAddress: (state, action) => {
      state.statusChooseAddress = action.payload;
    },
    setInforText: (state, action) => {
      const {name, text} = action.payload;
      state[name] = text;
    },
    setXYZNewAddress: (state, action) => {
      const {addressString, latitude, longitude} = action.payload;
      state.newAddress.addressString = addressString;
      state.newAddress.latitude = latitude;
      state.newAddress.longitude = longitude;
    },
    setChangeTextNewAddress: (state, action) => {
      const {name, text} = action.payload;
      state.newAddress[name] = text;
    },
  },
});

export default createOrderSlice.reducer;
export const {
  setSourceAddress,
  setDestinationAddress,
  setStatusChooseAddress,
  setInforText,
  setVehicleType,
  setXYZNewAddress,
  setChangeTextNewAddress,
} = createOrderSlice.actions;
