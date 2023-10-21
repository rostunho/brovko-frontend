import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popup',
  initialState: ['Popup1', 'Popup2'],
  reducers: {
    addPopUp(state, action) {
      return [...state, action.payload];
    },
    deletePopUp(state, action) {
      const index = state.findIndex(message => message.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addPopUp, deletePopUp } = popupSlice.actions;

export default popupSlice.reducer;
