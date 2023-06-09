import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';
import { fetchData } from '../../helpers/toolkit/fetches';

export const fetchCustomerData = createAsyncThunk(
  'customer/fetchCustomer',
  async () => {
    return fetchData(`/api/customers/customer`, 'get');
  },
);

export const getCustomers = createAsyncThunk('customer', async () => {
  return fetchData(`/api/customers`, 'get');
});

const initialState = {
  customer: null,
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
      .addCase(getCustomers.pending, createAsyncReducer('customer').pending)
      .addCase(getCustomers.fulfilled, createAsyncReducer('customer').fulfilled)
      .addCase(getCustomers.rejected, createAsyncReducer('customer').rejected);
  },
});

export const customerState = state => state.customer;
export const customerReducer = customerSlice.reducer;
