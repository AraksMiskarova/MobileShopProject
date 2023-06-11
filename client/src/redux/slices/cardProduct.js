import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../helpers/toolkit/fetches';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';

export const fetchCardProduct = createAsyncThunk(
  'cardProduct/fetchCardProduct',
  async id => {
    return fetchData(`/api/products/${id}`, 'get');
  },
);

const initialState = {
  product: null,
  status: 'loading',
};

export const getCardProduct = createSlice({
  name: 'cardProduct',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchCardProduct.pending, createAsyncReducer('product').pending)
      .addCase(
        fetchCardProduct.fulfilled,
        createAsyncReducer('product').fulfilled,
      )
      .addCase(
        fetchCardProduct.rejected,
        createAsyncReducer('product').rejected,
      );
  },
});

export const cardProductReducer = getCardProduct.reducer;

export const cardProductState = state => state.cardProduct;
