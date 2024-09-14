import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import sortingReducer from './sortingSlice';

const rootReducer = combineReducers({
  sorting: sortingReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;