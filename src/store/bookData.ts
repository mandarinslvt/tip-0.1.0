import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { IBook } from '../types/book.types';

const API_URL = 'http://localhost:3001/books';

export const fetchBooks = createAsyncThunk('books/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IBook[]>(API_URL);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка при загрузке книг');
  }
});

export const addNewBook = createAsyncThunk('books/add', async (newBook: Omit<IBook, 'id' | 'isAvailable'>, { rejectWithValue }) => {
  try {
    const response = await axios.post<IBook>(API_URL, { ...newBook, isAvailable: true });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка при добавлении книги');
  }
});

export const updateBookOnServer = createAsyncThunk('books/update', async (updatedBook: IBook, { rejectWithValue }) => {
  try {
    const response = await axios.put<IBook>(`${API_URL}/${updatedBook.id}`, updatedBook);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка при обновлении книги');
  }
});

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

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {}, 
  
  extraReducers: (builder) => {
    builder
      // Получение книг
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<IBook[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Добавление книги
      .addCase(addNewBook.fulfilled, (state, action: PayloadAction<IBook>) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })

      .addCase(updateBookOnServer.fulfilled, (state, action: PayloadAction<IBook>) => {
        const index = state.items.findIndex(b => b.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

// Селекторы для чтения данных (Пункт 4 ДЗ из прошлого урока)
export const selectAllBooks = (state: { books: BooksState }) => state.books.items;
export const selectBooksStatus = (state: { books: BooksState }) => state.books.status;
export const selectBooksError = (state: { books: BooksState }) => state.books.error;

export const selectBookById = (state: { books: BooksState }, bookId: string) => 
  state.books.items.find(book => book.id === bookId);

export default booksSlice.reducer;
