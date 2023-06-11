import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';
import { fetchData } from '../../helpers/toolkit/fetches';

export const fetchFilterPhones = createAsyncThunk(
  'filterProducts/fetchFilterProducts',
  async params => {
    const filterParams = `filter?categories=phons&${params}` ?? '';
    return fetchData(`/api/products/${filterParams}`, 'get');
  },
);

export const fetchFilterAccessories = createAsyncThunk(
  'filterProducts/fetchFilterAccessories',
  async params => {
    const filterParams = `filter?categories=accessories&${params}` ?? '';
    return fetchData(`/api/products/${filterParams}`, 'get');
  },
);

const initialState = {
  products: null,
  status: 'loading',
  filterMinPrice: null,
  filterMaxPrice: null,
  selectPage: 1,
  viewCount: '9',
  sortPrice: null,
};

export const getFilterProd = createSlice({
  name: 'filterProducts',
  initialState,
  reducers: {
    setMinPrice: (state, action) => {
      const newState = {
        ...state,
        filterMinPrice: action.payload,
      };
      return newState;
    },
    setMaxPrice: (state, action) => {
      const newState = {
        ...state,
        filterMaxPrice: action.payload,
      };
      return newState;
    },
    setSelectPage: (state, action) => {
      const newState = {
        ...state,
        selectPage: action.payload,
      };
      return newState;
    },
    setViewCount: (state, action) => {
      const newState = {
        ...state,
        viewCount: action.payload,
      };
      return newState;
    },
    setLeastPrice: state => {
      const newState = {
        ...state,
        sortPrice: '-currentPrice',
      };
      return newState;
    },
    setMostPrice: state => {
      const newState = {
        ...state,
        sortPrice: '+currentPrice',
      };
      return newState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchFilterPhones.pending,
        createAsyncReducer('products').pending,
      )
      .addCase(
        fetchFilterPhones.fulfilled,
        createAsyncReducer('products').fulfilled,
      )
      .addCase(
        fetchFilterPhones.rejected,
        createAsyncReducer('products').rejected,
      )
      .addCase(
        fetchFilterAccessories.pending,
        createAsyncReducer('products').pending,
      )
      .addCase(
        fetchFilterAccessories.fulfilled,
        createAsyncReducer('products').fulfilled,
      )
      .addCase(
        fetchFilterAccessories.rejected,
        createAsyncReducer('products').rejected,
      );
  },
});

export const filterProdReducer = getFilterProd.reducer;

export const {
  setMinPrice,
  setMaxPrice,
  setSelectPage,
  setViewCount,
  setLeastPrice,
  setMostPrice,
} = getFilterProd.actions;

export const filterProdState = state => state.filterProducts;
