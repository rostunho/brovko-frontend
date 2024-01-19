import { createSlice } from '@reduxjs/toolkit';

const warningSlice = createSlice({
  name: 'warning',
  initialState: {
    shown: false,
    title: 'Бро!',
    message: '',
  },
  reducers: {
    showWarning: (state, { payload }) => {
      const newState = { ...state, shown: true, message: payload };
      return newState;
    },

    hideWarning: state => {
      const newState = { ...state, shown: false, message: '' };
      return newState;
    },
  },
});

export const { showWarning, hideWarning } = warningSlice.actions;

export default warningSlice.reducer;
