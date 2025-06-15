export const selectCartItems = (state) => state.cart.cartItems;

export const selectTotalCartAmount = (state) => {
  const cartItems = selectCartItems(state);
  const foodList = selectFoodItems(state);
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      const itemInfo = foodList.find((product) => product._id === item);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
  }
  return totalAmount;
};

export const selectDeliveryFee = (state) => {
  const total = selectTotalCartAmount(state);
  let deliveryFee = 0;
  if (total > 0 && total < 15) { deliveryFee = 4; } 
  else if (total >= 15 && total < 30) { deliveryFee = 2; }
  // >= 30 - доставка бесплатная
  return deliveryFee;
};

export const selectCartPromoApplied = (state) => state.cart.promoApplied;
export const selectDiscountAmount = (state) => state.cart.discountAmount;


export const selectFoodItems = (state) => state.foodItems.items;
export const selectFoodItemsLoading = (state) => state.foodItems.loading;