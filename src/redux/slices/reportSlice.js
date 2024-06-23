import { createSlice } from '@reduxjs/toolkit';

const reportsSlices = createSlice({
    name: 'reports',
    initialState: {
        dataStatiscal: {},
        idDriverSelected: null,
    },
    reducers: {
        setDataStatiscal: (state, action) => {
            state.dataStatiscal = {
                ...action.payload
            };
        },
        setIdDriverSelected: (state, action) => {
            state.idDriverSelected = action.payload;
        }
    }

});
export default reportsSlices.reducer;
export const {
    setDataStatiscal,
    setIdDriverSelected
  } = reportsSlices.actions;
