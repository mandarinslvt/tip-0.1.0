import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { bookDataService } from '../../store/bookData'; // Импортируем наш чистый сервис
import { mockBooks } from '../../mocks/books'; 
import type { IBook } from '../../types/book.types';

// createAsyncThunk теперь вызывает функцию из bookData.ts
export const fetchBooks = createAsyncThunk(
  'books/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await bookDataService.getAllBooks();
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
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<IBook[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload || 'Произошла ошибка загрузки';
      });
  },
});

export const selectAllBooks = (state: { books: BooksState }) => state.books.items;
export const selectBooksStatus = (state: { books: BooksState }) => state.books.status;
export const selectBooksError = (state: { books: BooksState }) => state.books.error;

export const { clearBooks } = booksSlice.actions;
export default booksSlice.reducer;
export const selectBookById = (state: any, bookId: string) => 
  state.books.items.find((book: any) => String(book.id) === String(bookId));
