import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';

export const fetchSearchProduct = createAsyncThunk(
  'auth/fetchSearchProduct',
  async params => {
    try {
      const { data } = await axios.post('/api/products/search', params);
      const searchProducts = data;
      return searchProducts;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  searchProducts: null,
  status: 'loading',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(
        fetchSearchProduct.pending,
        createAsyncReducer('searchProducts').pending,
      )
      .addCase(
        fetchSearchProduct.fulfilled,
        createAsyncReducer('searchProducts').fulfilled,
      )
      .addCase(
        fetchSearchProduct.rejected,
        createAsyncReducer('searchProducts').rejected,
      );
  },
});

export const searchReducer = searchSlice.reducer;

export const searchState = state => state.search;
