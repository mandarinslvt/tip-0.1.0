import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchAllReaders } from '../../services/api';
import type { IReader } from '../../types/reader.types';
import type { RootState } from '../../app/store';

// 1. ИМПОРТИРУЕМ ЛОКАЛЬНЫХ ЧИТАТЕЛЕЙ:
import { mockReaders } from '../../mocks/readers'; 

// ВОЗВРАЩАЕМ ПРОПУЩЕННЫЙ THUNK (он нужен для extraReducers):
export const getReaders = createAsyncThunk(
  'readers/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAllReaders();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки');
    }
  }
);

interface ReadersState {
  readers: IReader[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReadersState = {
  // 2. ВМЕСТО ПУСТОГО МАССИВА [] ПОДСТАВЛЯЕМ НАШИ МOКИ:
  readers: mockReaders, 
  // 3. СРАЗУ СТАВИМ СТАТУС "SUCCEEDED", чтобы страница не ждала загрузки от бэкенда:
  status: 'succeeded', 
  error: null,
};

const readersSlice = createSlice({
  name: 'readers',
  initialState,
  reducers: {
    clearReaders: (state) => {
      state.readers = [];
      state.status = 'idle';
      state.error = null;
    },
    // ➕ ДОБАВЛЯЕМ ДЛЯ ДЗ: Добавление нового читателя
    addReader: (state, action: PayloadAction<IReader>) => {
      state.readers.push(action.payload);
    },
    // ✏️ ДОБАВЛЯЕМ ДЛЯ ДЗ: Редактирование существующего читателя
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

export const selectAllReaders = (state: RootState) => state.readers.readers;
export const selectReadersStatus = (state: RootState) => state.readers.status;
export const selectReadersError = (state: RootState) => state.readers.error;

// 🔗 НЕ ЗАБУДЬТЕ ЭКСПОРТИРОВАТЬ НОВЫЕ ЭКШЕНЫ ДЛЯ ФОРМЫ:
export const { clearReaders, addReader, updateReader } = readersSlice.actions;
export default readersSlice.reducer;
