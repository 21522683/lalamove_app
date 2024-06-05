import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  shortDescription: '',
  sourceAddress: {
    id: '',
    string: '',
  },
  destinationAddress: {
    id: '',
    string: '',
  },
  vehicleType: {},
  status: 'Đang chờ nhận',
  charge: 0,
  discountPrice: '',
  date: new Date(),
};

const createOrderSlice = createSlice({
  initialState: initialState,
  name: 'createOrderSlice',
  reducers: {},
});

export default createOrderSlice.reducer;
export const {} = createOrderSlice.actions;
