import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popups',
  initialState: [],
  reducers: {
    addPopUp: (state, { payload }) => {
      state.push(payload);
    },

    deletePopUp: (state, { payload }) => {
      return state.filter(el => el.id !== payload);
    },
  },
});

export const { addPopUp, deletePopUp } = popupSlice.actions;

export default popupSlice.reducer;
