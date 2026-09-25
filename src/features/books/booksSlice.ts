import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { IBook } from '../../types/book.types';

const API_BASE_URL = 'https://typicode.com';

export const fetchBooks = createAsyncThunk(
  'books/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IBook[]>(`${API_BASE_URL}/books`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

interface BooksState {
  items: IBook[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BooksState = {
  items: [], 
  status: 'idle', 
  error: null, 
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearBooks: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        console.log('⏳ Загрузка книг...');
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<IBook[]>) => {
        state.status = 'succeeded';
        state.items = action.payload; // Заливаем полученные данные в стейт
        console.log('Книги загружены:', action.payload.length);
      })
     
      .addCase(fetchBooks.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload || 'Произошла ошибка загрузки';
        console.log('❌ Ошибка загрузки книг:', state.error);
      });
  },
});

export const selectAllBooks = (state: { books: BooksState }) => state.books.items;
export const selectBooksStatus = (state: { books: BooksState }) => state.books.status;
export const selectBooksError = (state: { books: BooksState }) => state.books.error;

export const { clearBooks } = booksSlice.actions;
export { fetchBooks };
export default booksSlice.reducer;