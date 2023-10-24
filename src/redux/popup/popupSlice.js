import { createSlice } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';

// const popups = useSelector(getAllPopups)

const popupSlice = createSlice({
  name: 'popups',
  initialState: [],
  reducers: {
    addPopUp: (state, action) => {
      state.push(action.payload);
    },
    deletePopUp: (state) => {
        state.pop()}
  },
});

export const { addPopUp, deletePopUp } = popupSlice.actions;

export default popupSlice.reducer;
