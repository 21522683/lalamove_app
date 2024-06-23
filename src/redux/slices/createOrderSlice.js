import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  shortDescription: '',
  sourceAddress: {},
  destinationAddress: {},
  vehicleType: {},
  status: 'Đang chờ nhận',
  charge: 0,
  discountPrice: '',
  date: new Date(),
  statusChooseAddress: '',
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
  },
});

export default createOrderSlice.reducer;
export const {setSourceAddress, setDestinationAddress, setStatusChooseAddress} =
  createOrderSlice.actions;
