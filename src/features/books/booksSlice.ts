import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { bookDataService } from '../../store/bookData'; 
import { mockBooks } from '../../mocks/books'; 
import type { IBook } from '../../types/book.types';

interface BooksState {
  items: IBook[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Заливаем mockBooks прямо в initialState на случай, если бэкенд отключен
const initialState: BooksState = {
  items: mockBooks, 
  status: 'succeeded', 
  error: null, 
};

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

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearBooks: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
    // ВСТАВЛЯЕМ СЮДА: Добавление новой книги
    addBook: (state, action: PayloadAction<IBook>) => {
      state.items.push(action.payload);
    },
    // ВСТАВЛЯЕМ СЮДА: Редактирование книги
    updateBook: (state, action: PayloadAction<IBook>) => {
      const index = state.items.findIndex(b => String(b.id) === String(action.payload.id));
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    }
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

// Экспорт селекторов и экшенов
export const selectAllBooks = (state: { books: BooksState }) => state.books.items;
export const selectBooksStatus = (state: { books: BooksState }) => state.books.status;
export const selectBooksError = (state: { books: BooksState }) => state.books.error;

export const selectBookById = (state: any, bookId: string) => 
  state.books.items.find((book: any) => String(book.id) === String(bookId));

export const { addBook, updateBook, clearBooks } = booksSlice.actions;
export default booksSlice.reducer;
