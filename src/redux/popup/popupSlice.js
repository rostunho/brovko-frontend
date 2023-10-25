import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popups',
  initialState: [],
  reducers: {
    addPopUp: (state, action) => {
      state.push(action.payload);
    },
    deletePopUp: state => {
      state.pop();
    },
  },
});

export const { addPopUp, deletePopUp } = popupSlice.actions;

export default popupSlice.reducer;
