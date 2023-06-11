import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProducts: [],
  stateDrawer: false,
  status: 'loading',
};

const shoppingCartSlice = createSlice({
  name: 'cartLocal',
  initialState,
  reducers: {
    selectProduct(state, action) {
      const newState = {
        ...state,
        selectedProducts: [...state.selectedProducts, action.payload],
      };
      return newState;
    },
    setSelectedProducts(state, action) {
      const newState = {
        ...state,
        selectedProducts: action.payload,
      };
      return newState;
    },
    setProducts(state, action) {
      const newState = {
        ...state,
        products: action.payload,
      };
      return newState;
    },
    increaseCount(state, action) {
      const newState = {
        ...state,
        selectedProducts: state.selectedProducts.map(item => {
          if (item.itemNo === action.payload) {
            return { ...item, quantityCart: item.quantityCart + 1 };
          }
          return item;
        }),
      };
      return newState;
    },
    decreaseCount(state, action) {
      const newState = {
        ...state,
        selectedProducts: state.selectedProducts.map(item => {
          if (item.itemNo === action.payload) {
            return { ...item, quantityCart: item.quantityCart - 1 };
          }
          return item;
        }),
      };
      return newState;
    },
    toggleDrawer(state, action) {
      const newState = {
        ...state,
        stateDrawer: action.payload,
      };
      return newState;
    },
  },
});

export const {
  setSelectedProducts,
  increaseCount,
  decreaseCount,
  toggleDrawer,
} = shoppingCartSlice.actions;
export const stateCartProd = state => state.cartLocal.products;
export const stateSelectedProducts = state => state.cartLocal.selectedProducts;
export const stateDrawer = state => state.cartLocal.stateDrawer;
export const cartReducer = shoppingCartSlice.reducer;
