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
      const { id, value } = action.payload;
      console.log('action', action);
      console.log('newValue', value);
      const orderToUpdate = state.find(order => order._id === id);
      console.log('orderToUpdate', orderToUpdate);
      if (orderToUpdate) {
        orderToUpdate.value = value;
      }
    },
  },
});

export const { addOrder, deleteOrder, changeQuantity } = basketSlice.actions;
export const basketReducer = basketSlice.reducer;
