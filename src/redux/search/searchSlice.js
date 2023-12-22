import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  // Інші фільтри?
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      console.log('searchSlice_____', state.searchTerm);
    },
    // Інші reducer'и?
  },
});



export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
