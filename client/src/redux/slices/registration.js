import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';

export const fetchUserData = createAsyncThunk(
  'registration/fetchUserData',
  async params => {
    try {
      const { data } = await axios.post('/api/customers', params, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  },
);

const initialState = {
  data: null,
  status: 'loading',
};

const registSlice = createSlice({
  name: 'registration',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, createAsyncReducer('data').pending)
      .addCase(fetchUserData.fulfilled, createAsyncReducer('data').fulfilled)
      .addCase(fetchUserData.rejected, createAsyncReducer('data').rejected);
  },
});

export const registReducer = registSlice.reducer;
