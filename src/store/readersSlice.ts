import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchAllReaders } from '../services/api';
import type { IReader } from '../types/reader.types';

interface ReadersState {
  readers: IReader[]; // Используем readers, как заложено в вашей структуре
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
    // ВСТАВЛЯЕМ СЮДА: Добавление нового читателя
    addReader: (state, action: PayloadAction<IReader>) => {
      state.readers.push(action.payload);
    },
    // ВСТАВЛЯЕМ СЮДА: Редактирование читателя
    updateReader: (state, action: PayloadAction<IReader>) => {
      const index = state.readers.findIndex(r => String(r.id) === String(action.payload.id));
      if (index !== -1) {
        state.readers[index] = action.payload;
      }
    }
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

// Экспорт селекторов и экшенов
export const selectAllReaders = (state: { readers: ReadersState }) => state.readers.readers;
export const selectReadersStatus = (state: { readers: ReadersState }) => state.readers.status;

export const { addReader, updateReader, clearReaders } = readersSlice.actions;
export default readersSlice.reducer;
