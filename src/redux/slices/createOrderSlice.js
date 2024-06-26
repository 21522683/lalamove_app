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
  addNewAddressSuccessfully: false,
  isEditAddress: false,
  isRefreshOrder: false,
  indexVehicleChoosen: -1,
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
    addNewAddressSuccessfully: (state, action) => {
      const value = action.payload;
      state.addNewAddressSuccessfully = value;
    },

    setStatusEditAddress: (state, action) => {
      const value = action.payload;
      state.isEditAddress = value;
    },
    setEditAddress: (state, action) => {
      const address = action.payload;
      state.newAddress = address;
    },
    refreshChooseAddress: state => {
      state.sourceAddress = {};
      state.destinationAddress = {};
    },
    setVehicleType: (state, action) => {
      const {vehicleType, index} = action.payload;
      state.vehicleType = vehicleType;
      state.indexVehicleChoosen = index;
    },

    refreshOrder: state => {
      state.shortDescription = '';
      state.sourceAddress = {};
      state.destinationAddress = {};
      state.goodsImage = null;
      state.vehicleType = {};
      state.status = 'Đang chờ nhận';
      state.charge = 0;
      state.goodsType = '';
      state.note = '';
      state.statusChooseAddress = '';
      state.discountPrice = 0;
      state.newAddress = {};
      state.addNewAddressSuccessfully = false;
      state.isEditAddress = false;
      state.isRefreshOrder = true;
      state.indexVehicleChoosen = -1;
    },
    setRefreshOrder: (state, action) => {
      state.isRefreshOrder = action.payload;
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
  addNewAddressSuccessfully,
  setStatusEditAddress,
  setEditAddress,
  refreshChooseAddress,
  refreshOrder,
  setRefreshOrder,
} = createOrderSlice.actions;
