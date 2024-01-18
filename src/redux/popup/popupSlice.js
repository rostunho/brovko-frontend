import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popups',
  initialState: [],
  reducers: {
    addPopUp: (state, action) => {
      console.log('action :>> ', action);
      state.push(action.payload);
    },
    deletePopUp: state => {
      state.shift();
    },
  },
});

export const { addPopUp, deletePopUp } = popupSlice.actions;

export default popupSlice.reducer;
