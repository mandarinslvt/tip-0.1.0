import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllReaders } from '../services/api';
import type { IReader } from '../types/reader.types';

interface ReadersState {
  readers: IReader[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReadersState = {
  readers: [],
  status: 'idle',
  error: null,
};

export const getReaders = createAsyncThunk(
  'readers/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllReaders();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка при загрузке читателей');
    }
  }
);

export const readersSlice = createSlice({
  name: 'readers',
  initialState,
  reducers: {
    clearReaders: (state) => {
      state.readers = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReaders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getReaders.fulfilled, (state, action: PayloadAction<IReader[]>) => {
        state.status = 'succeeded';
        state.readers = action.payload; 
      })
      .addCase(getReaders.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Ошибка загрузки';
      });
  },
});

export const selectAllReaders = (state: { readers: ReadersState }) => state.readers.readers;
export const selectReadersStatus = (state: { readers: ReadersState }) => state.readers.status;

export const { clearReaders } = readersSlice.actions;
export default readersSlice.reducer;