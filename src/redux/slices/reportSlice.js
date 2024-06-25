import { createSlice } from '@reduxjs/toolkit';

const reportsSlices = createSlice({
    name: 'reports',
    initialState: {
        idDriverSelected: null,
        idOrderSelected: null,
    },
    reducers: {
        setIdDriverSelected: (state, action) => {
            state.idDriverSelected = action.payload;
        },
        setIdOrderSelected: (state, action) => {
            state.idOrderSelected = action.payload;
        }
    }

});
export default reportsSlices.reducer;
export const {
    setIdOrderSelected,
    setIdDriverSelected
  } = reportsSlices.actions;
