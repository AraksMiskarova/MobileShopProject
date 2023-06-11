import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { fetchData } from '../../helpers/toolkit/fetches';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';

export const fetchCartProducts = createAsyncThunk(
  'cartBackEnd/fetchCartProducts',
  async () => {
    try {
      const { data } = await axios.get(`/api/cart`);
      if (data) {
        const { products } = data;
        return products;
      }
    } catch (error) {
      console.warn(error);
    }
  },
);

export const fetchAddProductsCart = createAsyncThunk(
  'cartBackEnd/fetchAddProductsCart',
  async ({ productId }) => {
    return fetchData(`/api/cart/${productId}`, 'put');
  },
);

export const fetchDelProductsCart = createAsyncThunk(
  'cartBackEnd/fetchDelProductsCart',
  async ({ productId }) => {
    return fetchData(`/api/cart/${productId}`, 'delete');
  },
);

export const fetchAddProductQuant = createAsyncThunk(
  'cartBackEnd/fetchAddProductsQuant',
  async ({ productId }) => {
    return fetchData(`/api/cart/${productId}`, 'put');
  },
);

export const fetchDelProductQuant = createAsyncThunk(
  'cartBackEnd/fetchDelProductQuant',
  async ({ productId }) => {
    return fetchData(`/api/cart/product/${productId}`, 'delete');
  },
);

const initialState = {
  productsCartBack: null,
  status: 'loading',
  totalQuantityBack: null,
};

export const cartBack = createSlice({
  name: 'cartBackEnd',
  initialState,
  reducers: {
    increaseTotalQuantity: state => {
      const newState = {
        ...state,
        totalQuantityBack: state.totalQuantityBack + 1,
      };
      return newState;
    },
    decreaseTotalQuantity: state => {
      const newState = {
        ...state,
        totalQuantityBack: state.totalQuantityBack - 1,
      };
      return newState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchCartProducts.pending,
        createAsyncReducer('productsCartBack').pending,
      )
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        const prodArr = action.payload;
        const totalQuantity = prodArr
          ? prodArr.reduce((total, prod) => total + prod.cartQuantity, 0)
          : null;

        const newState = {
          ...state,
          status: 'loaded',
          productsCartBack: action.payload,
          totalQuantityBack: totalQuantity,
        };
        return newState;
      })
      .addCase(
        fetchCartProducts.rejected,
        createAsyncReducer('productsCartBack').rejected,
      )
      .addCase(
        fetchAddProductsCart.pending,
        createAsyncReducer('productsCartBack').pending,
      )
      .addCase(fetchAddProductsCart.fulfilled, (state, action) => {
        const newState = {
          ...state,
          status: 'loaded',
          productsCartBack: action.payload.products,
        };
        return newState;
      })
      .addCase(
        fetchAddProductsCart.rejected,
        createAsyncReducer('productsCartBack').rejected,
      )
      .addCase(
        fetchDelProductsCart.pending,
        createAsyncReducer('productsCartBack').pendingNoState,
      )
      .addCase(fetchDelProductsCart.fulfilled, (state, action) => {
        const prodArr = action.payload.products;
        const totalQuantity = prodArr.reduce(
          (total, prod) => total + prod.cartQuantity,
          0,
        );
        const newState = {
          ...state,
          status: 'loaded',
          productsCartBack: action.payload.products,
          totalQuantityBack: totalQuantity,
        };
        return newState;
      })
      .addCase(
        fetchDelProductsCart.rejected,
        createAsyncReducer('productsCartBack').rejected,
      )
      .addCase(
        fetchDelProductQuant.pending,
        createAsyncReducer('productsCartBack').pendingNoState,
      )
      .addCase(
        fetchDelProductQuant.fulfilled,
        createAsyncReducer('productsCartBack').fulfilledNoState,
      )
      .addCase(
        fetchDelProductQuant.rejected,
        createAsyncReducer('productsCartBack').rejected,
      )
      .addCase(
        fetchAddProductQuant.pending,
        createAsyncReducer('productsCartBack').pendingNoState,
      )
      .addCase(
        fetchAddProductQuant.fulfilled,
        createAsyncReducer('productsCartBack').fulfilledNoState,
      )
      .addCase(
        fetchAddProductQuant.rejected,
        createAsyncReducer('productsCartBack').rejected,
      );
  },
});

export const { increaseTotalQuantity, decreaseTotalQuantity } =
  cartBack.actions;

export const cartBackReducer = cartBack.reducer;
export const cartBackState = state => state.cartBackEnd;
