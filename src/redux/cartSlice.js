import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  cartCount: 0,
  isCartOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity = 1 } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity });
      }
      
      state.cartCount = state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemToRemove = state.cartItems.find(item => item.id === itemId);
      if (itemToRemove) {
        state.cartCount -= itemToRemove.quantity;
      }
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        const quantityDiff = quantity - item.quantity;
        item.quantity = quantity;
        state.cartCount += quantityDiff;
      }
    },
    
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    
    resetCart: (state) => {
      state.cartItems = [];
      state.cartCount = 0;
      state.isCartOpen = false;
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  toggleCart, 
  resetCart 
} = cartSlice.actions;

export default cartSlice.reducer;
