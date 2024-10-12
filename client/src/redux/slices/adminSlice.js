import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChestContents = createAsyncThunk('admin/fetchChestContents', async () => {
  const response = await axios.get('/api/admin/chest-contents');
  return response.data;
});

export const updateChestContents = createAsyncThunk('admin/updateChestContents', async (content) => {
  const response = await axios.post('/api/admin/chest-contents', content);
  return response.data;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    chestContents: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChestContents.fulfilled, (state, action) => {
        state.chestContents = action.payload;
      })
      .addCase(updateChestContents.fulfilled, (state, action) => {
        state.chestContents.push(action.payload);
      });
  },
});

export default adminSlice.reducer;
