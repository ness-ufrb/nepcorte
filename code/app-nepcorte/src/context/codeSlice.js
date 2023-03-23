import { createSlice } from '@reduxjs/toolkit';

// Define a slice using createSlice
const codeSlice = createSlice({
  name: 'code',
  initialState: { value: 0 },
  reducers: {
    putCode: (state, action) => {
        state.value = action.payload;
    }
  },
});

const codeReducer = codeSlice.reducer

// Export the actions and reducer from the slice
export const { putCode } = codeSlice.actions;
export default codeReducer;