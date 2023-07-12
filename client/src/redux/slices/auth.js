import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserToken = createAsyncThunk(
  'authorization/fetchUserData',
  async params => {
    try {
      const { data } = await axios.post(
        'https://mobileshop-api.onrender.com/api/customers/login',
        params,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const { token } = data;
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
      .addCase(fetchUserToken.pending, state => {
        const newState = {
          ...state,
          status: 'loading',
          token: null,
        };
        return newState;
      })
      .addCase(fetchUserToken.fulfilled, (state, action) => {
        const newState = {
          ...state,
          status: 'loaded',
          token: [action.payload],
        };
        return newState;
      })
      .addCase(fetchUserToken.rejected, state => {
        const newState = {
          ...state,
          status: 'error',
          token: null,
        };
        return newState;
      });
  },
});

export const selectIsAuth = state => Boolean(state.authorization.token);
export const token = state => state.authorization.token;
export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
