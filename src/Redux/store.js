// store.js
import rootReducer from './Reducer/rootReducer';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: rootReducer,
})