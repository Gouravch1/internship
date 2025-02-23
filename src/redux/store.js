// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Importing the cart reducer from the slice

// Configuring the Redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer, // Register the cart reducer to handle the cart state
  },
});
