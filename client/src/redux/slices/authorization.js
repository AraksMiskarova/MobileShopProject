import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncReducer } from '../../helpers/toolkit/extraReducers';

export const fetchUserToken = createAsyncThunk(
  'authorization/fetchUserData',
  async params => {
    try {
      const { data } = await axios.post('/api/customers/login', params, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { token, refreshToken } = data;
      console.log(11111, token, refreshToken);
      return token;
    } catch (error) {
      return error;
    }
  },
);

const initialState = {
  token: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logout(state) {
      const newState = {
        ...state,
        status: 'loading',
        token: null,
      };
      return newState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserToken.pending, createAsyncReducer('token').pending)
      .addCase(fetchUserToken.fulfilled, createAsyncReducer('token').fulfilled)
      .addCase(fetchUserToken.rejected, createAsyncReducer('token').rejected);
  },
});

export const token = state => state.authorization.token;
export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
