import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
  name: 'basket',
  initialState: [],
  reducers: {
    addOrder(state, action) {
      state.push(action.payload);
    },
    deleteOrder(state, action) {
      const index = state.findIndex(task => task.id === action.payload);
      state.splice(index, 1);
    },
    changeQuantity(state, action) {
      // return {
      //   ...state,
      //   quantity: action.payload.quantity,
      // };
    },
  },
});

export const { addOrder, deleteOrder, changeQuantity } = basketSlice.actions;
export const basketReducer = basketSlice.reducer;