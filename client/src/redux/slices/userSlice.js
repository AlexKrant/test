import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/api';

export const login = createAsyncThunk('user/login', async (credentials) => {
  const response = await api.login(credentials);
  return response.data;
});

export const register = createAsyncThunk('user/register', async (credentials) => {
  const response = await api.register(credentials);
  return response.data;
});

export const addFunds = createAsyncThunk('user/addFunds', async (amount) => {
  const response = await api.createPayment(amount);
  return response.data;
});

export const openChest = createAsyncThunk('user/openChest', async (chestType) => {
  const response = await api.openChest(chestType);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    balance: 0,
    lastTopUp: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      state.username = null;
      state.balance = 0;
      state.lastTopUp = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.balance = action.payload.balance;
        state.isAuthenticated = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.balance = action.payload.balance;
        state.isAuthenticated = true;
      })
      .addCase(addFunds.fulfilled, (state, action) => {
        // Здесь мы не обновляем баланс сразу, так как платеж еще не подтвержден
        state.lastTopUp = Date.now();
      })
      .addCase(openChest.fulfilled, (state, action) => {
        state.balance -= 1;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
