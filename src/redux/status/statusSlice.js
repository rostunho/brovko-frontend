import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toChangeStatusEmail: '',
};

const statusSlice = createSlice({
  name: 'changeStatus',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.toChangeStatusEmail = action.payload;
    },
  },
});

export const { setEmail } = statusSlice.actions;
export default statusSlice.reducer;
