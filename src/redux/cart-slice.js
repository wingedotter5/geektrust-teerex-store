import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      if (action.payload.quantity > 0) {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          if (action.payload.quantity > state.items[index].quantity) {
            state.items[index].quantity++;
          } else {
            throw new Error('Cannot add: Unavailable');
          }
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
      } else {
        throw new Error('Cannot add: Unavailable');
      }
    },
    reduceItem(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity--;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    removeFromCart(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { addToCart, reduceItem, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
