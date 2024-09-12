import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    filters: {
      color: [],
      gender: [],
      price: [],
      type: [],
      searchText: '',
    },
  },
  reducers: {
    colorChange(state, action) {
      const { color } = action.payload;
      const index = state.filters.color.findIndex((_color) => _color === color);
      if (index !== -1) {
        state.filters.color.splice(index, 1);
      } else {
        state.filters.color.push(color);
      }
    },
    genderChange(state, action) {
      const { gender } = action.payload;
      const index = state.filters.gender.findIndex(
        (_gender) => _gender === gender,
      );
      if (index !== -1) {
        state.filters.gender.splice(index, 1);
      } else {
        state.filters.gender.push(gender);
      }
    },
    priceRangeChange(state, action) {
      const { range } = action.payload;
      const index = state.filters.price.findIndex((_range) => _range === range);
      if (index !== -1) {
        state.filters.price.splice(index, 1);
      } else {
        state.filters.price.push(range);
      }
    },
    typeChange(state, action) {
      const { type } = action.payload;
      const index = state.filters.type.findIndex((_type) => _type === type);
      if (index !== -1) {
        state.filters.type.splice(index, 1);
      } else {
        state.filters.type.push(type);
      }
    },
    searchTextChange(state, action) {
      state.filters.searchText = action.payload;
    },
  },
});

export const {
  colorChange,
  genderChange,
  priceRangeChange,
  typeChange,
  searchTextChange,
} = productsSlice.actions;
export default productsSlice.reducer;
