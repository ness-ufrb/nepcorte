import { createSlice } from '@reduxjs/toolkit';

// Define a slice using createSlice
const codeSlice = createSlice({
  name: 'code',
  initialState: { value: '' },
  reducers: {
    putCode: (state, action) => {
      state.value = action.payload;
    },
    generateRandomCode: (state) => {
      const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      state.value = result;
    },
  },
});

const codeReducer = codeSlice.reducer

// Export the actions and reducer from the slice
export const { putCode, generateRandomCode } = codeSlice.actions;
export default codeReducer;