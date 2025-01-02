import { createSlice, nanoid } from "@reduxjs/toolkit";

// Initialize the cart with data from localStorage (if available)
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  return {
    id: nanoid(),
    items: [],
    totalPrice: 0,
  };
};

const initialState = loadCartFromLocalStorage();

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
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice += action.payload.price;
    },
    removeFromCart(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.totalPrice -= state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    setCart(state, action) {
      return action.payload; // Set the cart from local storage
    },
  },
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;
