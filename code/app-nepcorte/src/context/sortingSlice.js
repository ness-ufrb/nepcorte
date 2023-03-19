import { createSlice } from '@reduxjs/toolkit';

// Define a slice using createSlice
const sortingSlice = createSlice({
  name: 'sorting',
  initialState: { value: { code: '', situation: '', species: '', race: '', reproductiveSituation: '', age: 0 } },
  reducers: {
    putCode: (state, action) => {
      state.value.code = action.payload;
    },
    generateRandomCode: (state) => {
      const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      state.value.code = result;
    },
  }
});

const sortingReducer = sortingSlice.reducer

// Export the actions and reducer from the slice
export const { putCode, generateRandomCode } = sortingSlice.actions;
export default sortingReducer;