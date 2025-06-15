import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartSliceReducer from './slices/cart'
import { foodItemsSlice } from './slices/foodList'
import { cartSlice } from './slices/cart'
const combRed = combineReducers({
    foodItems: foodItemsSlice.reducer,
    cart: cartSlice.reducer
})

export const store = configureStore({
  reducer: combRed,
})

export default store;