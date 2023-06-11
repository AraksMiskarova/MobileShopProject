import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../../helpers/toolkit/api';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';
import { fetchData } from '../../helpers/toolkit/fetches';

export const fetchCustomerData = createAsyncThunk(
  'customer/fetchCustomer',
  async () => {
    return fetchData(`/api/customers/customer`, 'get');
  },
);

export const getCustomers = createAsyncThunk('customers', async () => {
  // eslint-disable-next-line no-return-await
  return await api.get('api/customers').then(response => {
    return response.data;
  });
});

const initialState = {
  customer: null,
  customers: null,
  status: 'loading',
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(
        fetchCustomerData.pending,
        createAsyncReducer('customer').pending,
      )
      .addCase(
        fetchCustomerData.fulfilled,
        createAsyncReducer('customer').fulfilled,
      )
      .addCase(
        fetchCustomerData.rejected,
        createAsyncReducer('customer').rejected,
      )
      .addCase(getCustomers.pending, createAsyncReducer('customers').pending)
      .addCase(
        getCustomers.fulfilled,
        createAsyncReducer('customers').fulfilled,
      )
      .addCase(getCustomers.rejected, createAsyncReducer('customers').rejected);
  },
});

export const customerState = state => state.customer;
export const customersState = state => state.customers;

export const customerReducer = customerSlice.reducer;
