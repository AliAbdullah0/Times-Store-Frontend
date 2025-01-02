// src/features/CartSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  id: nanoid(),
  items: [
    {
      id: 1,
      name: "Watch",
      price: 100,
      quantity: 1,
    },
  ],
  totalPrice: 100,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice += action.payload.price;
    },
    removeFromCart(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.totalPrice -= state.items[itemIndex].price;
        state.items.splice(itemIndex, 1);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
