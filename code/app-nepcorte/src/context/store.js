import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import codeReducer from './codeSlice';

const rootReducer = combineReducers({
  code: codeReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;