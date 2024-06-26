import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  vehicleType: {},
  vehicleTypes: [],
  isEdit: false,
  isAddVehicleTypeSuccess: false,
};

const vehicleTypeAdmin = createSlice({
  initialState: initialState,
  name: 'vehicleTypeAdmin',
  reducers: {
    setEditVehicleType: (state, action) => {
      const sizes = action.payload.size.split(' x ');
      const vehicle = {
        _id: action.payload._id,
        vehicleTypeName: action.payload.vehicleTypeName,
        mount: action.payload.mount.split('k')[0],
        size1: sizes[0].split('c')[0],
        size2: sizes[1].split('c')[0],
        size3: sizes[2].split('c')[0],
        minPrice: action.payload.minPrice,
        minLength: action.payload.minLength,
        priceAddIfOut: action.payload.priceAddIfOut,
        suitableFor: action.payload.suitableFor,
        image: action.payload.image,
        status: action.payload.status,
      };
      state.vehicleType = vehicle;
    },

    setAddVehicleType: (state, action) => {
      const vehicle = {
        vehicleTypeName: '',
        mount: '',
        size1: '',
        size2: '',
        size3: '',
        minPrice: '',
        minLength: '',
        priceAddIfOut: '',
        suitableFor: '',
        image: '',
        status: 'Đang hoạt động',
      };
      state.vehicleType = vehicle;
    },

    setInforText: (state, action) => {
      const {name, text} = action.payload;
      state.vehicleType[name] = text;
    },
    setVehicleTypes: (state, action) => {
      state.vehicleTypes = action.payload;
    },
    setStatusEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setAddVehicleTypeSuccess: (state, action) => {
      state.isAddVehicleTypeSuccess = action.payload;
    },
  },
});

export default vehicleTypeAdmin.reducer;
export const {
  setEditVehicleType,
  setInforText,
  setVehicleTypes,
  setStatusEdit,
  setAddVehicleTypeSuccess,
  setAddVehicleType,
} = vehicleTypeAdmin.actions;
