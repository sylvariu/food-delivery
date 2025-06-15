import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: {},
    promoApplied: false,
    discountAmount: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = 1;
      } else {
        state.cartItems[itemId]++;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.cartItems[itemId] > 0) {
        state.cartItems[itemId]--;
      }
    },
    clearCart: (state) => {
      state.cartItems = {};
      state.discountAmount = 0;
      state.promoApplied = false;
    },
    applyPromo: (state, action) => {
      const { discount } = action.payload;
      state.promoApplied = discount > 0;
      state.discountAmount = discount;
    },
    resetPromo: (state) => {
      state.discountAmount = 0;
      state.promoApplied = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart, applyPromo, resetPromo } = cartSlice.actions

export default cartSlice.reducer